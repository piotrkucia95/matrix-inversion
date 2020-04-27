export class GaussController {

    add(a: number, b: number): number {
        return a + b;
    }

    gaussElimination(matrix: number[][]): {
        echelonMatrix: number[][],
        result: number[]
    } {
        let m: number = matrix.length;
        let n: number = matrix[0].length;

        for (let i = 0; i < m-1; i++) {
            for (let j = i+1; j < m; j++) {
                if (Math.abs(matrix[i][i]) < Math.abs(matrix[j][i])) {
                    for (let k = 0; k < n; k++) {
                        let temp: number = matrix[i][k];
                        matrix[i][k] = matrix[j][k];
                        matrix[j][k] = temp;
                    }
                }
            } 

            for (let j = i+1; j < m; j++) {
                let term: number = matrix[j][i] / matrix[i][i]
                for (let k = 0; k < n; k++) {
                    matrix[j][k] = matrix[j][k] - (term * matrix[i][k]);
                }
            }
        }

        let result: number[] = new Array(m);
        for (let i = m-1; i >= 0; i--) {
            result[i] = matrix[i][n-1];
            for (let j = i+1; j < n-1; j++) {
                result[i] = result[i] - (matrix[i][j] * result[j]);
            }
            result[i] = result[i] / matrix[i][i];
        }

        return {
            echelonMatrix: matrix,
            result: result
        };
    }
}