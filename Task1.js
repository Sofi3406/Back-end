

//  The Notification class violates several SOLID principles

//1, Single Responsibility Principle (SRP):The Notification class has multiple responsibilities.
//2,Open/Closed Principle (OCP): The class is not open for extension. Adding a new notification type requires modifying the existing class.
//3, Liskov Substitution Principle (LSP):Subclasses cannot be used interchangeably without modifying the existing code.
//4, Interface Segregation Principle (ISP): The send method requires parameters for all types, forcing clients to provide unnecessary information
//5, Dependency Inversion Principle (DIP): The class depends directly on concrete implementations rather than abstractions.

// Notification Interface
class Notification {
    send(message) {
        throw new Error("This method should be overridden.");
    }
}

class EmailNotification extends Notification {
    constructor(emailAddress) {
        super();
        this.emailAddress = emailAddress;
    }

    send(message) {
        if (!this.emailAddress) throw new Error("Email required");
        console.log(`Sending Email to ${this.emailAddress}: ${message}`);
    }
}

class SMSNotification extends Notification {
    constructor(phoneNumber) {
        super();
        this.phoneNumber = phoneNumber;
    }

    send(message) {
        if (!this.phoneNumber) throw new Error("Phone Number required");
        console.log(`Sending SMS to ${this.phoneNumber}: ${message}`);
    }
}

class TelegramNotification extends Notification {
    constructor(telegramId) {
        super();
        this.telegramId = telegramId;
    }

    send(message) {
        if (!this.telegramId) throw new Error("Telegram ID required");
        console.log(`Sending Telegram to ${this.telegramId}: ${message}`);
    }
}

function createNotification(type, contactInfo) {
    switch (type) {
        case 'email':
            return new EmailNotification(contactInfo);
        case 'sms':
            return new SMSNotification(contactInfo);
        case 'telegram':
            return new TelegramNotification(contactInfo);
        default:
            throw new Error("Unknown notification type");
    }
}

// Usage
const n1 = createNotification('email', 'nexus@email.com');
n1.send('Hello!');

const n2 = createNotification('sms', '1234567890');
n2.send('Hi!');

const n3 = createNotification('telegram', 'telegram_user_42');
n3.send('Yo!');