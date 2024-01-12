import { BrandVariants } from "@fluentui/react-components";
import tinycolor from "tinycolor2";

const clamp = (value: number): number => {
    return value < 0 ? 0 : value > 1 ? 1 : value;
  };
  
  const lighten = (color: any, factor: number): string => {
    return tinycolor
      .fromRatio({
        h: color.h,
        s: clamp(color.s * (1 - factor)),
        v: clamp(color.v + (1 - color.v) * factor),
        a: color.a
      })
      .toHexString();
  };
  
  const darken = (color: any, factor: number): string => {
    return tinycolor
      .fromRatio({
        h: color.h,
        s: color.s,
        v: clamp(color.v * (1 - factor)),
        a: color.a
      })
      .toHexString();
  };


  
export const generateBrandVariants = (value?: string): BrandVariants => {
    const baseColor = tinycolor(value);
    const lum = baseColor.getLuminance();
    const hsv = baseColor.toHsv();
  
    // Hot Pink for debugging
    const brandRamp: BrandVariants = {
      10: "#FF69B4",
      20: "#FF69B4",
      30: "#FF69B4",
      40: "#FF69B4",
      50: "#FF69B4",
      60: "#FF69B4",
      70: "#FF69B4",
      80: "linear-gradient(90deg, rgba(255,0,48,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
      90: "#FF69B4",
      100: "#FF69B4",
      110: "#FF69B4",
      120: "#FF69B4",
      130: "#FF69B4",
      140: "#FF69B4",
      150: "#FF69B4",
      160: "#FF69B4"
    };
  
     const step = 0.1;
    // This is just a example brand ramp to fill in the palette
    if (lum > 0) {
      brandRamp[10] = darken(hsv, step *7);
      brandRamp[20] = darken(hsv, step *6);
      brandRamp[30] = darken(hsv, step *5);
      brandRamp[40] = darken(hsv, step *4);
      brandRamp[50] = darken(hsv, step *3);
      brandRamp[60] = darken(hsv, step *2);
      brandRamp[70] = darken(hsv, step);
    }
    brandRamp[80] = baseColor.toHexString();
    if (lum < 1) {
      brandRamp[90] = lighten(hsv, step);
      brandRamp[100] = lighten(hsv, step*2);
      brandRamp[110] = lighten(hsv, step*3);
      brandRamp[120] = lighten(hsv, step*4);
      brandRamp[130] = lighten(hsv, step*5);
      brandRamp[140] = lighten(hsv, step*6);
      brandRamp[150] = lighten(hsv, step*7);
      brandRamp[160] = lighten(hsv, step*8);
    }
  
    return brandRamp;
  };
  