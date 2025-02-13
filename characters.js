//Megan
let megan = {
    name: "Megan",
    hp: 1500,
    maxHp: 1500,
    spd: 200,
    atk: 100,
    critRate: 25,
    critDmg: 2,
    model: "./assets/Characters/Heroes/Mage.png",
    skill1: { title: "Fireball", description: "Launch a blazing fireball at the enemy, dealing damage on impact. The target is set ablaze, suffering a Burn status that inflicts damage every turn for the next rounds.", multiplicator: 2, effect: 50, type: "active", icon: "./assets/skills/Mage-Skills/fireball.png" },
    skill2: { title: "Thunder", description: "Call down a devastating bolt of lightning, striking the enemy with pure damage, bypassing all resistances and defenses. No armor, no barrier, and no magic can withstand its raw power.", multiplicator: 3, type: "active" },
    skill3: { title: "Relentless Spirit", description: "Unleash your inner fighting spirit, granting a chance to take an extra turn immediately after using an ability.", type: "passive", effect: 18 },
    skill4: { title: "Ice Age", description: "Unleash a wave of freezing energy, covering the battlefield in an icy storm. Enemies caught in the frost take damage and have a chance to be immobilizing them for the next turn.", multiplicator: 4.5, type: "active" }
  };
//Lucifer
  let lucifer = {
    name: "Lucifer",
    hp: 2000,
    maxHp: 2000,
    spd: 150,
    atk: 100,
    critRate: 25,
    critDmg: 2,
    model: "./assets/Characters/Demon/Lucifer.png",
    skill1: { title: "Dark Slash", description: "A powerful dark slash that cuts through the enemy.", multiplicator: 3, type: "active", damageTyp: "pure"},
    skill2: { title: "Shadow Bolt", description: "Fires a bolt of shadow energy that deals heavy damage.", multiplicator: 3, type: "active" },
    skill3: {title: "Fear", description: "Reduce the enemy's HP to 80% just by mere presence.", multiplicator: 0.2, type: "passive"}, 
    skill4: { title: "Soul Drain", description: "Drains the soul of the enemy, recovering some health.", multiplicator: 2.5, type: "active" }
  };

