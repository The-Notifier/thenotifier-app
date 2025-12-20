import * as Calendar from 'expo-calendar';
import { Alert, Linking, Platform } from 'react-native';
import { logger, makeLogHeader } from './logger';

const LOG_FILE = 'utils/open-link.ts';

/**
 * Opens a link, handling both regular URLs and thenotifier://calendar-event deep links.
 * For calendar event links, attempts to open the native calendar app with the event.
 * For regular URLs, opens them using the system's default handler.
 */
export async function openNotifierLink(link: string, t?: (key: string) => string): Promise<void> {
  const getText = (key: string) => t ? t(key) : key;
  if (!link) return;

  // Check if this is a calendar event link
  if (link.startsWith('thenotifier://calendar-event')) {
    try {
      // Parse the calendar event parameters
      const url = new URL(link);
      const eventId = url.searchParams.get('eventId');
      const calendarId = url.searchParams.get('calendarId');
      const startDateStr = url.searchParams.get('startDate');

      if (eventId && calendarId) {
        try {
          // Try to open the event using native calendar URL schemes
          let calendarUrl: string | null = null;

          if (Platform.OS === 'ios') {
            // iOS: Use calshow: scheme with the event's start date timestamp
            // Format: calshow:timestamp (timestamp is seconds since 2001-01-01)
            if (startDateStr) {
              const startDate = new Date(startDateStr);
              const timestamp = Math.floor((startDate.getTime() - new Date('2001-01-01').getTime()) / 1000);
              calendarUrl = `calshow:${timestamp}`;
            }
          } else {
            // Android: Use content:// URI with the event ID
            calendarUrl = `content://com.android.calendar/events/${encodeURIComponent(eventId)}`;
          }

          if (calendarUrl) {
            const canOpen = await Linking.canOpenURL(calendarUrl);
            if (canOpen) {
              await Linking.openURL(calendarUrl);
            } else {
              // Fallback: try to get the event and show details
              const startDate = startDateStr ? new Date(startDateStr) : new Date();
              const endDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000); // Add 1 day

              const events = await Calendar.getEventsAsync(
                [calendarId],
                new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000), // 7 days before
                endDate
              );

              const event = events.find(e => e.id === eventId);
              if (event) {
                Alert.alert(
                  getText('alertTitles.menu'),
                  `Event: ${event.title || 'Untitled'}\n\nTo view this event, please open your calendar app.`,
                  [{ text: getText('buttonText.ok') }]
                );
              } else {
                Alert.alert(getText('alertTitles.error'), getText('errorMessages.calendarEventNotFound'));
              }
            }
          } else {
            Alert.alert(getText('alertTitles.error'), getText('errorMessages.unableToGenerateCalendarLink'));
          }
        } catch (error) {
          logger.error(makeLogHeader(LOG_FILE, 'openNotifierLink'), 'Failed to open calendar event:', error);
          Alert.alert(getText('alertTitles.error'), getText('errorMessages.unableToOpenCalendarEvent'));
        }
      } else {
        Alert.alert(getText('alertTitles.error'), getText('errorMessages.invalidCalendarEventLink'));
      }
    } catch (error) {
      logger.error(makeLogHeader(LOG_FILE, 'openNotifierLink'), 'Failed to parse calendar link:', error);
      Alert.alert(getText('alertTitles.error'), getText('errorMessages.invalidLinkFormat'));
    }
  } else {
    // Regular URL - try to open it
    try {
      const canOpen = await Linking.canOpenURL(link);
      if (canOpen) {
        await Linking.openURL(link);
      } else {
        Alert.alert(getText('alertTitles.error'), getText('errorMessages.unableToOpenLink'));
      }
    } catch (error) {
      logger.error(makeLogHeader(LOG_FILE, 'openNotifierLink'), 'Failed to open URL:', error);
      Alert.alert(getText('alertTitles.error'), getText('errorMessages.unableToOpenLinkGeneric'));
    }
  }
}

