import numeral from 'numeral';

export const percentageFormat = (number) => {
  return numeral(number).format(`0.00%`)
}

export const currencyFormat = (number, currency, decimals = 2) => {
  if (decimals === 2) {
    return numeral(number).format(`${currency}0,0.00`)
  } else {
    return numeral(number).format(`${currency}0,0.0000`)
  }
}


/**
 * scientific notation checker
 * @param {number} number - number to check
 */

function isScientific(number) {
  //eslint-disable-next-line
  return /\d+\.?\d*e[\+\-]*\d+/i.test(Math.abs(number))
}

/**
 * number rounder
 * @param {number} number - number to round
 * @param {number} decimalPlaces - expected decimals to round to
 */

export const rounder = (number, decimalPlaces) => {
  if (!isScientific(number)) {
    return Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces)
  } else {
    return rounder(scientificToDecimal(number), decimalPlaces)
  }
}

/**
 * scientific to decimal
 * @param {number} num - number to turn to decimal
 */

const scientificToDecimal = function (num) {
  let nsign = Math.sign(num);
  //remove the sign
  num = Math.abs(num);
  //if the number is in scientific notation remove it
  if (isScientific(num)) {
    let zero = '0',
      parts = String(num).toLowerCase().split('e'), //split into coeff and exponent
      e = parts.pop(), //store the exponential part
      l = Math.abs(e), //get the number of zeros
      sign = e / l,
      coeff_array = parts[0].split('.');
    if (sign === -1) {
      l = l - coeff_array[0].length;
      if (l < 0) {
        num = coeff_array[0].slice(0, l) + '.' + coeff_array[0].slice(l) + (coeff_array.length === 2 ? coeff_array[1] : '');
      }
      else {
        num = zero + '.' + new Array(l + 1).join(zero) + coeff_array.join('');
      }
    }
    else {
      let dec = coeff_array[1];
      if (dec)
        l = l - dec.length;
      if (l < 0) {
        num = coeff_array[0] + dec.slice(0, l) + '.' + dec.slice(l);
      } else {
        num = coeff_array.join('') + new Array(l + 1).join(zero);
      }
    }
  }

  return nsign < 0 ? '-'+num : num;
};
