const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require("../game");

jest.spyOn(window, "alert").mockImplementation( () => {});

beforeAll(() => {
    let fs = require("fs");
    let fileContents = fs.readFileSync("index.html", "utf-8");
    document.open();
    document.write(fileContents);
    document.close();
});

describe("game object contains correct keys", () => {
    test("score key exists", () => {
        expect("score" in game).toBe(true);
    });
    test("currentGame key exists", () => {
        expect("currentGame" in game).toBe(true);
    });
    test("playerMoves key exists", () => {
        expect("playerMoves" in game).toBe(true);
    });
    test("choices key exists", () => {
        expect("choices" in game).toBe(true);
    });
    test("choices contain correct ids", () => {
        expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
    });
    test("turnNumber key exists", () => {
        expect("turnNumber" in game).toBe(true);
    });
    test("lastButton key exists", () => {
        expect("lastButton" in game).toBe(true);
    });
    test("turnInProgress key exists", () => {
        expect("turnInProgress" in game).toBe(true);
    });
    test("turnInProgress key value is false", () => {
        expect("turnInProgress" in game).toBe(true);
    });
});

describe("newGame works correctly", () => {
    beforeAll(() => {
        game.score = 42;
        game.playerMoves = ["button1", "button2"];
        game.currentGame = ["button1", "button2"];
        document.getElementById("score").innerText = "42";
        newGame();
    });
    test("should set game score to zero", () => {
        expect(game.score).toEqual(0);
    });
    test("should display 0 for the element with id of score", () => {
        expect(document.getElementById("score").innerText).toEqual(0);
    });
    test("should clear the player moves array", () => {
        expect(game.playerMoves.length).toBe(0);
    });
    test("should be a value in the computer sequence array", () => {
        expect(game.currentGame.length).toBe(1);
    });
    test("expect data-listener to be true", () => {
        newGame();
        const elements = document.getElementsByClassName("circle");
        for (let element of elements) {
            expect(element.getAttribute("data-listener")).toEqual("true");
        }
    });
});

describe ("game play function works as expected", () => {
        beforeEach(() => {
            game.score = 0;
            game.playerMoves = [];
            game.currentGame = [];
            addTurn();
        });
        afterEach(() => {
            game.score = 0;
            game.playerMoves = [];
            game.currentGame = [];
        });
        test("addTurn adds a new turn to the current game", () => {
            addTurn();
            expect(game.currentGame.length).toBe(2);
        });
        test("The correct class should be added when runinng the lightsOn function", () => {
            let button = document.getElementById(game.currentGame[0]);
            lightsOn(game.currentGame[0]);
            expect(button.classList).toContain("light");
        });
        test ("showTurns function should update the game.turnNumber", () => {
            game.turnNumber = 33;
            showTurns();
            expect(game.turnNumber).toBe(0);
        });
        test("should increment the score if the turn is correct", () => {
            game.playerMoves.push(game.currentGame[0]);
            playerTurn();
            expect(game.score).toBe(1);
        });
        test("should return an error if wrong move", () =>{
            game.playerMoves.push("wrong");
            playerTurn();
            expect(window.alert).toBeCalledWith("Wrong move!");
        });
        test("clicking during computer sequence should fail", () => {
            showTurns();
            game.lastButton = "";
            document.getElementById("button2").click();
            expect(game.lastButton).toEqual("");
        });
    });