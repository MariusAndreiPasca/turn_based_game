let player = {
    hp: 1000,
    spd: 200,
    atk: 100,
    critRate: 25,
    critDmg: 1.5,
    skill1: [title = "Fireball", description= "Launch a blazing fireball at the enemy, dealing 150 damage on impact. The target is set ablaze, suffering a Burn status that inflicts 50 damage per turn for the next rounds.", multiplicator = 2, effect = 50, type = "active"],
    skill2: [title = "Thunder", description= "Call down a devastating bolt of lightning, striking the enemy with pure damage, bypassing all resistances and defenses. No armor, no barrier, and no magic can withstand its raw power.", multiplicator = 3, type = "active"],
    skill3: [title = "Relentless Spirit", description= "Unleash your inner fighting spirit, granting a chance to take an extra turn immediately after using an ability.", type = "passive", effect = 25],
    skill4: [title = "Ice Age", description= "Unleash a devastating wave of freezing energy, covering the battlefield in an icy storm. Enemies caught in the frost take damage and have a chance to be stunned, immobilizing them for the next turn. ", multiplicator = 4.5, type = "active"]
}

let enemy = {
    hp: 2000,
    spd: 150,
    atk: 100,
    critRate: 30,
    critDmg: 2,
    skill1: 100,
    skill2: 200,
    skill3: 25,
    skill4: 400
}

let atkFirst;

function turnOrder() {
    atkFirst = (player.spd > enemy.spd) ? player : enemy;
}

function playerAtk() {
    if(atkFirst == player) {
        switch(skills) {
            case 1: 
            enemy.hp = enemy.hp - (player.atk * player.skill1.multiplicator)
            break
            case 2: 
            enemy.hp = enemy.hp - (player.atk * player.skill2.multiplicator)
            break
            case 3: 
            enemy.hp = enemy.hp - (player.atk * player.skill4.multiplicator)
            break
        }
    } else {
        enemyAtk
    }
}

