var submitManualCreation = function() {
    var order           = +jQuery('#order-input').val();
    var matrixElements  = jQuery('#matrix-elements');
    var time            = jQuery('#time');
    var errorMessage    = jQuery('#order-error');
    if (!order || order < 0) {
        errorMessage.text('Wprowadź stopień macierzy.');
    } else if (matrixElements.length || time.length)  {
        errorMessage.text('Wyczyść układ przed wygenerowaniem kolejnego.');
    } else {
        errorMessage.text('');
        var inputsHTML = '<div id="matrix-elements" class="pt-3">';
        for (let i = 0; i < order; i++) {
            inputsHTML += '<div class="mb-1">'
            for (let j = 0; j < order; j++) {
                inputsHTML += '<input id="el_' + i + '_' + j + '" class="inversion-input mr-1"/>' 
            }
            inputsHTML += '</div>'
        }
        inputsHTML += '<div id="inversion-error" class="error text-danger"></div>';
        inputsHTML += '<button id="inverse-button" class="mt-3" onclick="inverseMatrix(true);">Odwróć macierz</button>'
        inputsHTML += '</div>';
        jQuery('#inversion-container').append(inputsHTML);
    }
};

var submitRandomCreation = function() {
    var order           = +jQuery('#order-input').val();
    var matrixElements  = jQuery('#matrix-elements');
    var time            = jQuery('#time');
    var errorMessage    = jQuery('#order-error');
    if (!order || order < 0) {
        errorMessage.text('Wprowadź stopień macierzy.');
    } else if (matrixElements.length || time.length) {
        errorMessage.text('Wyczyść układ przed wygenerowaniem kolejnego.');
    } else {
        errorMessage.text('');
        inverseMatrix(false);
    }
};

var inverseMatrix = function(isManual) {
    var matrix = isManual ? getMatrixElements() : generateMatrix();
    sendInversionRequest(matrix);
};

var getMatrixElements = function() {
    var inputs = jQuery('.inversion-input');
    var matrix = [];
    for (let e of inputs) {
        if (!e.value) {
            jQuery('#inversion-error').text('Wypełnij wszystkie pola.');
        } else {
            var elementId = e.id.split('_');
            matrix[elementId[1]] ? matrix[elementId[1]][elementId[2]] = +e.value : matrix[elementId[1]] = [+e.value];
        }
    }
    return matrix;
};

var generateMatrix = function() {
    var order = +jQuery('#order-input').val();
    var matrix = [];
    for (let i = 0; i < order; i++) {
        matrix[i] = [];
        for (let j = 0; j < order; j++) {
            if (i === j) {
                matrix[i][j] = order + 1;   
            } else {
                matrix[i][j] = 1;            }
        }
    }
    return matrix;
};

var sendInversionRequest = function(matrix) {
    var startTime = performance.now();
    jQuery.ajax({
        url: '/matrix-inverse',
        type: 'post',
        dataType: 'json',
        data: {
            'matrix': JSON.stringify(matrix)
        },
    })
    .done((data) => {
        var endTime = performance.now();
        if (data.length < 10) {
            displayInversionResults(data);
        }
        jQuery('#inversion-container').append('<div id="time" class="mt-3">' + (data.length < 10 ? '' : 'Otrzymano macierz odwrotną. ') + 'Czas obliczeń: ' + ((endTime - startTime).toFixed(2)) + ' ms.</div>');
    });
};

var displayInversionResults = function(results) {
    var echelonHTML = '<div id="echelon" class="pt-4">Macierz odwrotna::'
    echelonHTML += '<table class="echelon-matrix mt-2">';
    for (let row of results) {
        echelonHTML += '<tr><td> </td>';
        for (column of row) {
            echelonHTML += ('<td>&nbsp;&nbsp;' + column + '&nbsp;&nbsp;</td>');
        }
        echelonHTML += '<td> </td></tr>';
    }
    echelonHTML += '</table>';
    jQuery('#inversion-container').append(echelonHTML);
}

var subimtNumberOfVariables = function () {
    var numberOfVariables   = +jQuery('#variable-input').val();
    var errorMessage        = jQuery('#variables-error');
    var equationsElement    = jQuery('#equations');

    if (numberOfVariables <= 0 && !equationsElement.length) {
        errorMessage.text('Wprowadź ilość niewiadomych.');
    } else if (equationsElement.length) {
        errorMessage.text('Wyczyść układ przed wygenerowaniem kolejnego.');
    } else {
        errorMessage.text('');
        let equationsHTML = generateEquationInputs(numberOfVariables);
        jQuery('#equations-container').append(equationsHTML);
    }
};

var clearPanel = function() {
    jQuery('#matrix-elements').remove();
    jQuery('#equations').remove();
    jQuery('#echelon').remove();
    jQuery('#time').remove();
    jQuery('#results').remove();
}

var solveEquations = function() {
    jQuery('#echelon').remove();
    jQuery('#results').remove();
    var numberOfVariables = +jQuery('#variable-input').val();
    var matrix = new Array(numberOfVariables);
    for (let i = 0; i < numberOfVariables; i++) {
        matrix[i] = new Array(numberOfVariables + 1);
    }

    var equations = jQuery('.equations-input');
    for (let e of equations) {
        if (!e.value) {
            jQuery('#equations-error').text('Wypełnij wszystkie pola.');
            return;
        } else {
            let index = e.id.split('_');
            matrix[index[0]-1][index[1]-1] = +e.value;
        }
    }
    jQuery('#equations-error').text('');
    sendEquationsRequest(matrix);
}

var generateEquationInputs = function (numberOfVariables) {
    var equationsHTML = '<div id="equations" class="pt-3">';
    for (let i = 0; i < numberOfVariables; i++) {
        equationsHTML += generateEquationRow(i + 1, numberOfVariables);
    } 
    equationsHTML += '<div id="equations-error" class="error text-danger"></div>';
    equationsHTML += '<button id="solve-button" class="mt-3" onclick="solveEquations();">Rozwiąż układ</button>'
    equationsHTML += '</div>'
    return equationsHTML;
}

var generateEquationRow = function (row, numberOfVariables) {
    var rowHTML = '<div class="pb-2">';
    for (let i = 0; i < numberOfVariables; i++) {
        rowHTML += generateInput(row, i + 1);
        rowHTML += ('x<sub>' + (i + 1) + '</sub>');
        rowHTML += (i + 1 !== numberOfVariables ? ' + ' : ' = ' + generateInput(row, i + 2)); 
    }
    rowHTML += '</div>'
    return rowHTML;
}

var generateInput = function (row, column) {
    return `<input type"number" id="${row + '_' + column}" class="equations-input"> `;
}

var sendEquationsRequest = function(matrix) {
    var startTime = performance.now();
    jQuery.ajax({
        url: '/gauss-solutions',
        type: 'post',
        dataType: 'json',
        data: {
            'matrix': JSON.stringify(matrix)
        },
    })
    .done((data) => {
        var endTime = performance.now();
        displayEquationsResults(data);
        jQuery('#equations-container').append('<div id="time" class="mt-3">Czas obliczeń: ' + ((endTime - startTime).toFixed(2)) + ' ms.</div>');
    });
};

var displayEquationsResults = function(result) {
    var echelonHTML = '<div id="echelon" class="pt-4">Macierz schodkowa:'
    echelonHTML += '<table class="echelon-matrix mt-2">';
    for (let row of result.echelonMatrix) {
        echelonHTML += '<tr><td> </td>';
        for (column of row) {
            echelonHTML += ('<td>&nbsp;&nbsp;' + column + '&nbsp;&nbsp;</td>');
        }
        echelonHTML += '<td> </td></tr>';
    }
    echelonHTML += '</table>';
    resultsHTML = checkSolutions(result.echelonMatrix, result.result);
    jQuery('#equations-container').append(echelonHTML);
    jQuery('#equations-container').append(resultsHTML);
};

var checkSolutions = function(matrix, results) {
    var resultsHTML = '<div id="results" class="pt-4">';
    var m = matrix.length;
    var n = matrix[0].length;
    var isInconsistent = false; // sprzeczny
    var isDependant = true; // nieoznaczony

    for (let i = 0; i < matrix[0].length; i++) {
        if (isDependant && matrix[m-1][n-1] != 0 || matrix[m-1][n-1] == null) {
            isInconsistent = true;
        } else {
            isInconsistent = false;
        }
        if (matrix[m-1][i] != 0) {
            isDependant = false;
        }
    }

    if (isDependant && matrix[m-1][n-1] != 0) {
        isInconsistent = true;
    } 

    if (isInconsistent) {
        resultsHTML += "Brak rozwiązań. Układ jest sprzeczny."
    } else if (isDependant) {
        resultsHTML += "Nieskończenie wiele rozwiązań. Układ jest nieoznaczony."
    } else {
        resultsHTML += 'Układ jest oznaczony. Rozwiązania:';
        resultsHTML += '<div class="solutions">';
        for (let [i, s] of results.entries()) {
            resultsHTML += ('<div class="pt-2">x<sub>' + (i + 1) + '</sub>' + ' = ' + s + '</div>');
        }
        resultsHTML += '</div>';
    }
    resultsHTML += '</div>';
    return resultsHTML;
}


