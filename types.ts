/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


export interface Scheme {
  id: string;
  title: string;
  badge: string;
  rate: string;
  description: string;
  benefits: string[];
  color: string; // 'red' | 'green' | 'slate'
  
  // New Modal Data
  calculation: {
    label: string;
    value: string;
  };
  
  // Interactive Calculator Config
  calculatorConfig?: {
    type: 'SSY' | 'KVP' | 'RD' | 'FD' | 'MIS' | 'SCSS' | 'NSC' | 'PLI';
    inputLabel: string;
    min: number;
    max: number;
    step: number;
    defaultValue: number;
    prefix: string; // e.g. '₹'
    suffix?: string; // e.g. '/month'
  };

  documents: string[];
  whatsappText: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export enum Section {
  HERO = 'hero',
  SCHEMES = 'schemes',
  CONTACT = 'contact',
}