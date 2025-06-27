const { sin, cos, atan2, sqrt } = Math;

export function vLength([x, y]) {
  return sqrt(x * x + y * y);
}

export function vAdd(a, b) {
  return [a[0] + b[0], a[1] + b[1]];
}

export function vSub(a, b) {
  return [a[0] - b[0], a[1] - b[1]];
}

export function vScale(vec, s) {
  return [vec[0] * s, vec[1] * s];
}

export function vDistance(from, to) {
  return vLength(vSub(to, from));
}

export function vRot([x, y], angle) {
  let ca = cos(angle);
  let sa = sin(angle);
  return [x * ca - y * sa, x * sa + y * ca];
}

export function vAngle([x, y]) {
  return atan2(y, x);
}

export function vAngleBetween(v, w) {
  return atan2(w[1] * v[0] - w[0] * v[1], v[0] * w[0] + v[1] * w[1]);
}

export function vNorm([x, y]) {
  let l = vLength([x, y]);
  return [x / l, y / l];
}