enum PastelColors {
  Color1 = "#909dbc",
  Color2 = "#cc9cc7",
  Color3 = "#dfd5ac",
  Color4 = "#b5c6ec",
  Color5 = "#9c8492",
  Color6 = "#e1d4b1",
  Color7 = "#9ab7e0",
  Color8 = "#889ed6",
  Color9 = "#95c69e",
  Color10 = "#b4e5f4",
}

export default PastelColors;

// interface Color{
//   baseColor: string | keyof typeof PastelColors;
//   number: number;
//   generateColor: ()=>string
// }

export class GenerateColors {
  static baseColor: keyof typeof PastelColors;
  static num: number;

  constructor() {
    GenerateColors.baseColor = "Color8"; // Default to Color8
  }

  static generateColor() {
    this.num = Math.floor(Math.random() * 10) + 1;
    GenerateColors.baseColor = `Color${this.num}` as keyof typeof PastelColors;
    return PastelColors[GenerateColors.baseColor];
  }
}
