import type React from 'react';

export interface Style {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  category: string;
  prompt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  styles: Style[];
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