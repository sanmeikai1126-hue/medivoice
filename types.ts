
export interface TranscriptItem {
  speaker: string;
  text: string;
}

export interface SoapContent {
  s: string; // Subjective
  o: string; // Objective
  a: string; // Assessment
  p: string; // Plan
}

export interface GeminiResponse {
  language: string;
  transcription: TranscriptItem[];
  soap: SoapContent;
}

export interface PatientInfo {
  id: string;
  name: string;
}

export interface MedicalRecord {
  id: string;
  date: string; // ISO String
  patient: PatientInfo;
  data: GeminiResponse;
}

export enum AppMode {
  STANDARD = 'STANDARD',
  TRANSLATE = 'TRANSLATE',
}

export enum ChatRole {
  DOCTOR = 'DOCTOR',   // 日本語
  PATIENT = 'PATIENT', // 外国語
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  originalText: string;
  translatedText?: string;
  timestamp: number;
  isFinal: boolean; // 文字起こし確定フラグ
}
