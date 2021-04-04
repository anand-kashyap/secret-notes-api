interface Note {
  id: number;
  message: string;
  encryption: number; // foreign key
  timestamp: string | Date;
}

interface IEncryption {
  id: number;
  name: string;
  description?: string;
}
export { Note, IEncryption };
