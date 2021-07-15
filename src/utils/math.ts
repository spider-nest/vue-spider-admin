// 生成随机ID
export const generateId = () => {
  return Math.floor(Math.random() * 10000);
};

/**
 * 四则运算
 * @param v1
 * @param v2
 * @param type '+' '-' '*' '/'
 * @returns {*|number}
 */
export function arithmetic(v1, v2, type) {
  if (type === "+") {
    // 加法
    v1 += "";
    v2 += "";
    let r1, r2;
    try {
      r1 = v1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = v2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    const m = 10 ** Math.max(r1, r2);
    return (arithmetic(v1, m, "*") + arithmetic(v2, m, "*")) / m;
  } else if (type === "-") {
    // 减法
    return arithmetic(v1, -v2, "+");
  } else if (type === "*") {
    // 乘法
    v1 += "";
    v2 += "";
    let m = 0;
    const s1 = v1.toString();
    const s2 = v2.toString();
    try {
      m += s1.split(".")[1].length;
    } catch (e) {
      console.error(e);
    }
    try {
      m += s2.split(".")[1].length;
    } catch (e) {
      console.error(e);
    }
    return (
      (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) / 10 ** m
    );
  } else if (type === "/") {
    // 除法
    v1 += "";
    v2 += "";

    if (v2 === "0") return 0;

    let t1 = 0;
    let t2 = 0;
    try {
      t1 = v1.toString().split(".")[1].length;
    } catch (e) {
      console.error(e);
    }
    try {
      t2 = v2.toString().split(".")[1].length;
    } catch (e) {
      console.error(e);
    }
    const r1 = Number(v1.toString().replace(".", ""));
    const r2 = Number(v2.toString().replace(".", ""));
    return (r1 / r2) * 10 ** (t2 - t1);
  } else {
    return 0;
  }
}
