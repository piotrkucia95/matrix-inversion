"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Controller {
    add(a, b) {
        return a + b;
    }
    solveEquations(matrix) {
        var m = matrix.length;
        var n = matrix[0].length;
        for (let i = 0; i < m - 1; i++) {
            for (let j = i + 1; j < m; j++) {
                if (Math.abs(matrix[i][i]) < Math.abs(matrix[j][i])) {
                    for (let k = 0; k < n; k++) {
                        let temp = matrix[i][k];
                        matrix[i][k] = matrix[j][k];
                        matrix[j][k] = temp;
                    }
                }
            }
            for (let j = i + 1; j < m; j++) {
                let term = matrix[j][i] / matrix[i][i];
                for (let k = 0; k < n; k++) {
                    matrix[j][k] = matrix[j][k] - (term * matrix[i][k]);
                }
            }
        }
        let result = new Array(m);
        for (let i = m - 1; i >= 0; i--) {
            result[i] = matrix[i][n - 1];
            for (let j = i + 1; j < n - 1; j++) {
                result[i] = result[i] - (matrix[i][j] * result[j]);
            }
            result[i] = result[i] / matrix[i][i];
        }
        return {
            echelonMatrix: matrix,
            result: result
        };
    }
    inverseMatrix(matrix) {
        var m = matrix.length;
        var inverse = [];
        var ratio;
        for (let i = 0; i < m; i++) {
            for (let j = m; j < 2 * m; j++) {
                if (j === (i + m)) {
                    matrix[i][j] = 1;
                }
                else {
                    matrix[i][j] = 0;
                }
            }
        }
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < m; j++) {
                if (i !== j) {
                    ratio = matrix[j][i] / matrix[i][i];
                    for (let k = 0; k < 2 * m; k++) {
                        matrix[j][k] -= ratio * matrix[i][k];
                    }
                }
            }
        }
        for (let i = 0; i < m; i++) {
            ratio = matrix[i][i];
            inverse[i] = [];
            for (let j = m; j < 2 * m; j++) {
                matrix[i][j] /= ratio;
                inverse[i][j - m] = matrix[i][j];
            }
        }
        return inverse;
    }
}
exports.Controller = Controller;
