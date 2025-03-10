const player1 = {
    NOME: "Mario",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};
const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};
const player3 = {
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0,
};
const player4 = {
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0,
};
const player5 = {
    NOME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
};
const player6 = {
    NOME: "Donkey Kong",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
};

function rollDice(){
   return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBLock() {
    let random = Math.random()
    let result

    switch(true){
        case random < 0.33:
            result = "RETA";
            break;

        case random < 0.66:
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }
    return result;
}

async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName}🎲 Rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playerRaceEngine(character1, character2) {
    for(let round = 1; round <= 5; round++){
        console.log(`🏁 Rodada ${round}`);

        // Sortear Bloco
        let block = await getRandomBLock()
        console.log(`Bloco: ${block}`);

        //Rolar os Dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if((block === "RETA")){
            totalTestSkill1 = diceResult1 + character1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + character2.VELOCIDADE;

            await logRollResult(
                character1.NOME, 
                "VELOCIDADE", 
                diceResult1,
                character1.VELOCIDADE
            );
            await logRollResult(
                character2.NOME, 
                "VELOCIDADE", 
                diceResult2,
                character2.VELOCIDADE
            );
        }
        if((block === "CURVA")){
            totalTestSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(
                character1.NOME, 
                "MANOBRABILIDADE", 
                diceResult1,
                character1.MANOBRABILIDADE
            );
            await logRollResult(
                character2.NOME, 
                "MANOBRABILIDADE", 
                diceResult2,
                character2.MANOBRABILIDADE
            );
        }
        if((block === "CONFRONTO")){
            let powerResult1 = diceResult1 + character1.PODER;
            let powerResult2 = diceResult2 + character2.PODER;

            console.log(`${character1.NOME} Confrontou com ${character2.NOME}! 🥊`);

            await logRollResult(
                character1.NOME, 
                "PODER", 
                diceResult1,
                character1.PODER
            );

            await logRollResult(
                character2.NOME, 
                "PODER", 
                diceResult2,
                character2.PODER
            );

            if (powerResult1 > powerResult2) {
                if (character2.PONTOS > 0) {
                    character2.PONTOS -= 1; // Player2 perde 1 ponto se tiver
                }
            } else if (powerResult2 > powerResult1) {
                if (character1.PONTOS > 0) {
                    character1.PONTOS -= 1; // Player1 perde 1 ponto se tiver
                }
            }
            
            console.log(powerResult2 === powerResult1 ? "Confronto empatado! Nenhum ponto foi perdido" : "")
        }
            
        // ferificando o vencedor

        if(totalTestSkill1 > totalTestSkill2){
            console.log(`${character1.NOME} Marcou um ponto !`);
            character1.PONTOS++;
        }
        else if(totalTestSkill2 > totalTestSkill1){
            console.log(`${character2.NOME} Marcou um ponto !`);
            character2.PONTOS++;
        }

        

        console.log("----------------------");
    } 
}

async function declareWinner(character1, character2) {
    console.log("Resultado Final");
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

    if(character1.PONTOS > character2.PONTOS){
        console.log(`\n${character1.NOME} Venceu a corrida! Parábens! 🏆`);
    }else if(character2.PONTOS > character1.PONTOS){
        console.log(`\n${character2.NOME} Venceu a corrida! Parábens! 🏆`);
    }else{
        console.log("A corrida terminou em empate");
    }
}

(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);

   await playerRaceEngine(player1, player2);
   await declareWinner(player1, player2);
})()