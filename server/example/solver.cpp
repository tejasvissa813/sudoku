//go:build ignore
#include <iostream>
#include <cstdlib>
#include <ctime>
#include <vector>
#include <unordered_set>
#include <utility>
using namespace std;

struct hashFunction{
    size_t operator()(const pair<int, int>& x) const{
        return x.first ^ x.second;
    }
};

bool isFull(vector<vector<int>> grid){
    for(auto x : grid){
        for(auto y : x){
            if(y == -1) return false;
        }
    }
    return true;
}

void printPuzzle(vector<vector<int>> puzzle){
    for(auto x : puzzle){
        for(auto y : x){
            cout << y << " ";
        }
        cout << endl;
    }
}

pair<int, int> getNext(int N, int M, unordered_set<pair<int, int>, hashFunction> visited){
    for(int i = 0; i < N; i++){
        for(int j = 0; j < M; j++){
            if(visited.count({i,j}) == 0){
                return {i, j};
            }
        }
    }
    return {10, 10};
}

bool solvePuzzle(vector<vector<int>>& puzzle){
    unordered_set<int> emptySet;
    unordered_set<pair<int,int>, hashFunction> visited;
    vector<unordered_set<int>> rows(puzzle.size(), emptySet);
    vector<unordered_set<int>> cols(puzzle.size(), emptySet);
    vector<unordered_set<int>> squares(puzzle.size(), emptySet);

    //data structure set up
    for(int i = 0; i < puzzle.size(); i++){
        for(int j = 0; j < puzzle[0].size(); j++){
            if(puzzle[i][j] != -1){
                visited.insert({i,j});

                int rowNumber = i;
                int colNumber = j;
                int squareNumber = (i/3)*3 + (j/3);

                if(rows[rowNumber].count(puzzle[i][j]) == 0 && cols[colNumber].count(puzzle[i][j]) == 0 && squares[squareNumber].count(puzzle[i][j]) == 0){
                    rows[rowNumber].insert(puzzle[i][j]);
                    cols[colNumber].insert(puzzle[i][j]);
                    squares[squareNumber].insert(puzzle[i][j]);
                }
                else{
                    return false;
                }
            }
        }
    }

    pair<int,int> curr = getNext(puzzle.size(), puzzle.size(), visited);
    if(curr.first != 10){
        for(int i = 1; i <= 9; i++){
            int rowN = curr.first;
            int colN = curr.second;
            int squareN = (curr.first/3)*3 + (curr.second/3);
            if(rows[rowN].count(i) == 0 && cols[colN].count(i) == 0 && squares[squareN].count(i) == 0){
                vector<vector<int>> modPuzzle = puzzle;
                modPuzzle[curr.first][curr.second] = i;
                if(solvePuzzle(modPuzzle)){
                    puzzle = modPuzzle;
                    return true;
                }
            }
        }
        return false;
    }

    return true;
}

vector<vector<int>> getRandomPuzzle(int difficulty){
    vector<vector<int>> puzzle(9, vector<int>(9, -1));
    vector<vector<int>> tempPuzzle = puzzle;
    vector<vector<int>> prev = tempPuzzle;
    while(solvePuzzle(puzzle) && !isFull(prev)){
        prev = tempPuzzle;
        tempPuzzle[(rand()%8)][(rand()%8)] = rand()%9+1;
        puzzle = tempPuzzle;
    }
    puzzle = prev;
    tempPuzzle = prev;
    solvePuzzle(prev);
    for(int i = 0; i<prev.size(); i++){
        for(int j = 0; j<prev[0].size(); j++){
            int prob = rand()%20;
            if(prob < difficulty) prev[i][j] = -1;
        }
    }
    return prev;
}

int main(){
    srand(time(0));
    vector<vector<int>> puzzle = getRandomPuzzle(10);
    for(auto x : puzzle){
        for(auto y : x){
            cout << y << " ";
        }
        cout  << "\n";
    }
}