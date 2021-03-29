declare namespace Express {
  interface Request {
    DB: import('mysql2/promise').Connection;
  }
}

/* interface AuthData {
  sheets: {
    [entity: string]: { retriggerUrls: WebhookEvent };
  };
  user: {
    database: string;
    email: string;
    name: string;
  };
} */
