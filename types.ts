import type React from 'react';

export interface Style {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  prompt: string;
  startDate?: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
  subCategory?: string;
}

export interface StyleTab {
  id: string;
  name: string;
}

export interface ImageType {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface AspectRatio {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface Accessory {
  item: string;
  color: string;
}

export type AccessorySuggestions = Record<string, Record<string, string[]>>;

export type AccessoryDefaults = Record<string, Partial<Record<string, Accessory>>>;

export interface IdPhotoSize {
  id: string;
  name: string;
}

export interface IdPhotoBackground {
  id: string;
  name: string;
  className: string;
}

export interface IdPhotoAttire {
  id: string;
  name: string;
  prompt: string;
}
