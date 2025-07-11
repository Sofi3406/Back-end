
//  The Notification class violates several SOLID principles

//1, Single Responsibility Principle (SRP):The Notification class has multiple responsibilities.
//2,Open/Closed Principle (OCP): The class is not open for extension. Adding a new notification type requires modifying the existing class.
//3, Liskov Substitution Principle (LSP):Subclasses cannot be used interchangeably without modifying the existing code.
//4, Interface Segregation Principle (ISP): The send method requires parameters for all types, forcing clients to provide unnecessary information
//5, Dependency Inversion Principle (DIP): The class depends directly on concrete implementations rather than abstractions.



// Base Notification class
class Notification {
    send(message) {
        throw new Error("This method should be overridden.");
    }
}

// NotificationChannel interface
class NotificationChannel {
    constructor(channelName) {
        this.channelName = channelName;
    }

    send(message) {
        throw new Error("This method should be overridden.");
    }
}

// Email Notification Channel
class EmailNotification extends NotificationChannel {
    constructor(emailAddress) {
        super('Email');
        this.emailAddress = emailAddress;
    }

    send(message) {
        if (!this.emailAddress) throw new Error("Email required");
        console.log(`Sending Email to ${this.emailAddress}: ${message}`);
    }
}

// SMS Notification Channel
class SMSNotification extends NotificationChannel {
    constructor(phoneNumber) {
        super('SMS');
        this.phoneNumber = phoneNumber;
    }

    send(message) {
        if (!this.phoneNumber) throw new Error("Phone Number required");
        console.log(`Sending SMS to ${this.phoneNumber}: ${message}`);
    }
}

// Telegram Notification Channel
class TelegramNotification extends NotificationChannel {
    constructor(telegramId) {
        super('Telegram');
        this.telegramId = telegramId;
    }

    send(message) {
        if (!this.telegramId) throw new Error("Telegram ID required");
        console.log(`Sending Telegram to ${this.telegramId}: ${message}`);
    }
}

// Notification Factory
class NotificationFactory {
    static createNotification(channelType, contactInfo) {
        const channels = {
            email: EmailNotification,
            sms: SMSNotification,
            telegram: TelegramNotification
        };

        const ChannelClass = channels[channelType.toLowerCase()];
        if (!ChannelClass) {
            throw new Error("Unknown notification type");
        }

        return new ChannelClass(contactInfo);
    }
}

// Usage
const n1 = NotificationFactory.createNotification('email', 'nexus@email.com');
n1.send('Hello!');

const n2 = NotificationFactory.createNotification('sms', '1234567890');
n2.send('Hi!');

const n3 = NotificationFactory.createNotification('telegram', 'telegram_user_42');
n3.send('Yo!');
