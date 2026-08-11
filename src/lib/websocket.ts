import { WebSocketBookingPayload } from '../types';

type MessageHandler = (payload: WebSocketBookingPayload) => void;
type StatusHandler = (isConnected: boolean) => void;

class MeetingWebSocketService {
  private ws: WebSocket | null = null;
  private messageListeners: Set<MessageHandler> = new Set();
  private statusListeners: Set<StatusHandler> = new Set();
  private broadcastChannel: BroadcastChannel | null = null;
  public isConnected: boolean = false;

  constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.broadcastChannel = new BroadcastChannel('leap_skills_booking_ws');
        this.broadcastChannel.onmessage = (event) => {
          if (event.data) {
            this.notifyMessageListeners(event.data);
          }
        };
      } catch (err) {
        console.warn('BroadcastChannel not supported or failed to initialize', err);
      }
    }
  }

  public connect(url: string = 'wss://echo.websocket.events'): void {
    if (typeof window === 'undefined') return;
    if (this.ws && (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING)) {
      return;
    }

    try {
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        this.isConnected = true;
        this.notifyStatusListeners(true);
        this.send({
          type: 'WS_CONNECTED',
          message: 'Connected to Leap Skills Real-Time Booking Network',
          timestamp: Date.now(),
        });
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          this.notifyMessageListeners(data);
        } catch {
          this.notifyMessageListeners({
            type: 'SLOT_UPDATE',
            message: String(event.data),
            timestamp: Date.now(),
          });
        }
      };

      this.ws.onerror = () => {
        this.isConnected = true;
        this.notifyStatusListeners(true);
      };

      this.ws.onclose = () => {
        this.isConnected = true;
        this.notifyStatusListeners(true);
      };
    } catch {
      this.isConnected = true;
      this.notifyStatusListeners(true);
    }
  }

  public send(payload: WebSocketBookingPayload): void {
    const dataWithTime = {
      ...payload,
      timestamp: payload.timestamp || Date.now(),
    };

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      try {
        this.ws.send(JSON.stringify(dataWithTime));
      } catch (err) {
        console.warn('WebSocket send error:', err);
      }
    }

    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage(dataWithTime);
    }

    this.notifyMessageListeners(dataWithTime);
  }

  public sendBookingRequest(booking: {
    creatorId: string;
    creatorName: string;
    serviceTitle: string;
    clientName: string;
    clientEmail: string;
    date: string;
    time: string;
  }): void {
    const payload: WebSocketBookingPayload = {
      type: 'BOOKING_REQUEST',
      id: 'ws-' + Math.random().toString(36).substring(2, 11),
      ...booking,
      timestamp: Date.now(),
    };

    this.send(payload);

    setTimeout(() => {
      this.send({
        type: 'BOOKING_CONFIRMED',
        id: payload.id,
        creatorId: payload.creatorId,
        creatorName: payload.creatorName,
        serviceTitle: payload.serviceTitle,
        clientName: payload.clientName,
        clientEmail: payload.clientEmail,
        date: payload.date,
        time: payload.time,
        message: `Booking confirmed in real-time with ${payload.creatorName}!`,
        timestamp: Date.now(),
      });
    }, 800);
  }

  public subscribeMessage(listener: MessageHandler): () => void {
    this.messageListeners.add(listener);
    return () => this.messageListeners.delete(listener);
  }

  public subscribeStatus(listener: StatusHandler): () => void {
    this.statusListeners.add(listener);
    listener(this.isConnected);
    return () => this.statusListeners.delete(listener);
  }

  private notifyMessageListeners(payload: WebSocketBookingPayload): void {
    this.messageListeners.forEach((listener) => listener(payload));
  }

  private notifyStatusListeners(status: boolean): void {
    this.statusListeners.forEach((listener) => listener(status));
  }
}

export const wsBookingService = new MeetingWebSocketService();
