// 12. Define interfaces Flyable
// and Swimmable. Implement them in Bird and Fish classes.
export interface Flyable {}
export interface Swimmable {}

export class Bird implements Flyable {}
export class Fish implements Swimmable {}
