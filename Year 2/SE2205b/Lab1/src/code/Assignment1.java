package code;

import java.io.*;

public class Assignment1 {

    /**
     * implements the Strassen’s algorithm in a recursive manner
     *
     * @param A    two-dimensional array representing one dense matrix
     * @param B    two-dimensional array representing second dense matrix
     * @param size is the size of matrices A and B
     * @return the two-dimensional integer resultant matrix C of the product of A and B
     */
    public int[][] denseMatrixMult(int[][] A, int[][] B, int size) {
        int n = size;
        int[][] c00 = initMatrix(n / 2);
        int[][] c01 = initMatrix(n / 2);
        int[][] c10 = initMatrix(n / 2);
        int[][] c11 = initMatrix(n / 2);
        int[][] R = initMatrix(n);
        int[][] z = initMatrix(n);

        if (n == 1) {

            R[0][0] = A[0][0] * B[0][0];

        } else {

            int[][] m0 = denseMatrixMult(sum(A, A, 0, 0, n / 2, n / 2, n / 2), sum(B, B, 0, 0, n / 2, n / 2, n / 2), n / 2);
            int[][] m1 = denseMatrixMult(sum(A, A, n / 2, 0, n / 2, n / 2, n / 2), sum(B, z, 0, 0, n / 2, n / 2, n / 2), n / 2);
            int[][] m2 = denseMatrixMult(sum(A, z, 0, 0, n / 2, n / 2, n / 2), sub(B, B, 0, n / 2, n / 2, n / 2, n / 2), n / 2);
            int[][] m3 = denseMatrixMult(sum(A, z, n / 2, n / 2, n / 2, n / 2, n / 2), sub(B, B, n / 2, 0, 0, 0, n / 2), n / 2);
            int[][] m4 = denseMatrixMult(sum(A, A, 0, 0, 0, n / 2, n / 2), sum(B, z, n / 2, n / 2, n / 2, n / 2, n / 2), n / 2);
            int[][] m5 = denseMatrixMult(sub(A, A, n / 2, 0, 0, 0, n / 2), sum(B, B, 0, 0, 0, n / 2, n / 2), n / 2);
            int[][] m6 = denseMatrixMult(sub(A, A, 0, n / 2, n / 2, n / 2, n / 2), sum(B, B, n / 2, 0, n / 2, n / 2, n / 2), n / 2);


            for (int i = 0; i < n / 2; i++) {

                for (int j = 0; j < n / 2; j++) {

                    c00[i][j] = m0[i][j] + m3[i][j] - m4[i][j] + m6[i][j];
                    c01[i][j] = m2[i][j] + m4[i][j];
                    c10[i][j] = m1[i][j] + m3[i][j];
                    c11[i][j] = m0[i][j] - m1[i][j] + m2[i][j] + m5[i][j];
                }

            }

            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {

                    if ((i < n / 2) && (j < n / 2)) {

                        R[i][j] = c00[i][j];

                    } else if ((i < n / 2) && (j >= n / 2)) {

                        R[i][j] = c01[i][j - n / 2];

                    } else if ((i >= size / 2) && (j < size / 2)) {

                        R[i][j] = c10[i - n / 2][j];

                    } else {

                        R[i][j] = c11[i - n / 2][j - n / 2];

                    }

                }


            }

        }

        return R;

    }

    public int[][] sum(int[][] A, int[][] B, int x1, int y1, int x2, int y2, int n) {
        int[][] matrix = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                matrix[i][j] = A[x1 + i][y1 + j] + B[x2 + i][y2 + j];
            }
        }
        return matrix;
    }

    public int[][] sub(int[][] A, int[][] B, int x1, int y1, int x2, int y2, int n) {
        int[][] matrix = new int[n][n];
        for (int i = 0; i < n; i++) {
            for (int j = 0; j < n; j++) {
                matrix[i][j] = A[x1 + i][y1 + j] - B[x2 + i][y2 + j];
            }
        }
        return matrix;
    }

    /**
     * a 2D array of size n will be initialize
     *
     * @param n matrix size
     * @return new empty matrix with size n
     */
    public int[][] initMatrix(int n) {
        return new int[n][n];
    }

    /**
     * Print the matrix by looping through the 2D array
     *
     * @param n matrix size
     * @param A print matrix
     */
    public void printMatrix(int n, int[][] A) {
        // using foreach loop.. no need for n
        for (int[] a : A) {
            for (int num : a) {
                System.out.print(num + " ");
            }
            // new line at the end
            System.out.println();
        }
    }

    /**
     * Read a file from disk
     *
     * @param filename name of file
     * @param n        size of array
     * @return parsed matrix
     * @throws Exception by bufferedreader
     */
    public int[][] readMatrix(String filename, int n) throws Exception {
        // Use absolute file path name esp. since it's being run on a different environment
        BufferedReader br = new BufferedReader(new FileReader(new File("src/" + filename)));
        String matrixString;

        int[][] matrix = new int[n][n];
        int counter = 0; // keep track of the line
        // Loop through each line
        while ((matrixString = br.readLine()) != null) {
            // split the line by space and put each number into the 2d array
            String[] one_d = matrixString.split(" ");
            for (int i = 0; i < matrix.length; i++) {
                matrix[counter][i] = Integer.parseInt(one_d[i]);
            }
            counter++;
        }
        // return parsed matrix array
        return matrix;
    }

}