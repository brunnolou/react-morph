import { Easing } from '@popmotion/easing';

export type NumberObject = { [key: string]: number };
export type EaseObject = { [key: string]: Easing };
export type Easings = EaseObject | Easing;
export type Easing = (v: number) => number;

export interface SpringConfig {
  stiffness?: number; // The spring stiffness coefficient.
  damping?: number; // Defines how the spring’s motion should be damped due to the forces of friction.
  mass?: number; // The mass of the object attached to the end of the spring.
  allowsOverdamping?: boolean; // Whether or not the spring allows "overdamping" (a damping ratio > 1). Defaults to false.
  overshootClamping?: boolean; // False when overshooting is allowed, true when it is not. Defaults to false.
  restVelocityThreshold?: number; // When spring's velocity is below `restVelocityThreshold`, it is at rest. Defaults to .001.
  restDisplacementThreshold?: number; // When the spring's displacement (current value) is below `restDisplacementThreshold`, it is at rest. Defaults to .001.
}

export interface MorphOptions {
  keepFrom?: boolean;
  type?: string;
  getMargins?: boolean;
  portalElement?: HTMLElement;
  zIndex?: number;
  spring?: SpringConfig;
  isReversed?: boolean;
	easings?: Easings;
	progress?: number,
}
