// 9. Define an interface Animal with name and method sound().
export interface Animal {
  name: string;

  sound(): void;
  // phương thức của interface để rỗng để
  // lớp khác overide
  // console.log("gâu gâu");
}
