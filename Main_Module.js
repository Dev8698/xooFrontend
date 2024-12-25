var mainArr = [
    ['.', '.', '.'],
    ['.', '.', '.'],
    ['.', '.', '.']
];

var WhosTurn = 0;

function ValueAssign(row, col) {
    if (WhosTurn == 0) {
        mainArr[row][col] = 'o';
    }
    else {
        mainArr[row][col] = 'x';
    }
}


function check() {
    //This function will decide who wins 'n'=no one wins, 'x'=x wins, 'y'= y wins
    if (mainArr[0][0] == 'o' && mainArr[0][1] == 'o' && mainArr[0][2] == 'o') {
        return 'o';
    }
    else if (mainArr[1][0] == 'o' && mainArr[1][1] == 'o' && mainArr[1][2] == 'o') {
        return 'o';
    }
    else if (mainArr[2][0] == 'o' && mainArr[2][1] == 'o' && mainArr[2][2] == 'o') {
        return 'o';
    }
    else if (mainArr[0][0] == 'o' && mainArr[1][0] == 'o' && mainArr[2][0] == 'o') {
        return 'o';
    }
    else if (mainArr[0][1] == 'o' && mainArr[1][1] == 'o' && mainArr[2][1] == 'o') {
        return 'o';
    }
    else if (mainArr[0][2] == 'o' && mainArr[1][2] == 'o' && mainArr[2][2] == 'o') {
        return 'o';
    }
    else if (mainArr[0][0] == 'o' && mainArr[1][1] == 'o' && mainArr[2][2] == 'o') {
        return 'o';
    }
    else if (mainArr[0][2] == 'o' && mainArr[1][1] == 'o' && mainArr[2][0] == 'o') {
        return 'o';
    }
    //yo
    else if (mainArr[0][0] == 'x' && mainArr[0][1] == 'x' && mainArr[0][2] == 'x') {
        return 'x';
    }
    else if (mainArr[1][0] == 'x' && mainArr[1][1] == 'x' && mainArr[1][2] == 'x') {
        return 'x';
    }
    else if (mainArr[2][0] == 'x' && mainArr[2][1] == 'x' && mainArr[2][2] == 'x') {
        return 'x';
    }
    else if (mainArr[0][0] == 'x' && mainArr[1][0] == 'x' && mainArr[2][0] == 'x') {
        return 'x';
    }
    else if (mainArr[0][1] == 'x' && mainArr[1][1] == 'x' && mainArr[2][1] == 'x') {
        return 'x';
    }
    else if (mainArr[0][2] == 'x' && mainArr[1][2] == 'x' && mainArr[2][2] == 'x') {
        return 'x';
    }
    else if (mainArr[0][0] == 'x' && mainArr[1][1] == 'x' && mainArr[2][2] == 'x') {
        return 'x';
    }
    else if (mainArr[0][2] == 'x' && mainArr[1][1] == 'x' && mainArr[2][0] == 'x') {
        return 'x';
    } 
    else {
        return 'n';
    }

}



console.log(check());