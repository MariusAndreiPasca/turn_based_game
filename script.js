// Player
let player = {
    hp: 1500,
    maxHp: 1500,
    spd: 200,
    atk: 100,
    critRate: 25,
    critDmg: 2,
    skill1: { title: "Fireball", description: "Launch a blazing fireball at the enemy, dealing damage on impact. The target is set ablaze, suffering a Burn status that inflicts damage every turn for the next rounds.", multiplicator: 2, effect: 50, type: "active" },
    skill2: { title: "Thunder", description: "Call down a devastating bolt of lightning, striking the enemy with pure damage, bypassing all resistances and defenses. No armor, no barrier, and no magic can withstand its raw power.", multiplicator: 3, type: "active" },
    skill3: { title: "Relentless Spirit", description: "Unleash your inner fighting spirit, granting a chance to take an extra turn immediately after using an ability.", type: "passive", effect: 18 },
    skill4: { title: "Ice Age", description: "Unleash a wave of freezing energy, covering the battlefield in an icy storm. Enemies caught in the frost take damage and have a chance to be immobilizing them for the next turn.", multiplicator: 4.5, type: "active" }
  };
// Enemy
  let enemy = {
    hp: 2000,
    maxHp: 2000,
    spd: 150,
    atk: 100,
    critRate: 30,
    critDmg: 2,
    skill1: { title: "Dark Slash", description: "A powerful dark slash that cuts through the enemy.", multiplicator: 2, type: "active" },
    skill2: { title: "Shadow Bolt", description: "Fires a bolt of shadow energy that deals heavy damage.", multiplicator: 3, type: "active" },
    skill4: { title: "Soul Drain", description: "Drains the soul of the enemy, recovering some health.", multiplicator: 2.5, type: "active" }
  };
  
  
  let skillBoxes = document.querySelectorAll(".skill-box");
  let skillDescriptionBox = document.querySelector(".skill-description-box");
  let skillName = document.querySelector(".skill-name");
  let skillDescription = document.querySelector(".skill-description");
  let skillTable = document.querySelector(".skills-table");

  
  
  // Hover event
  skillBoxes.forEach((box) => {
    box.addEventListener("mouseover", () => {
      let skillKey = box.dataset.skill; 
      let skillData = player[skillKey]; 
  
      if (skillData) {
        skillName.textContent = skillData.title; 
        skillDescription.textContent = skillData.description; 
        skillDescriptionBox.style.opacity = 1; 
      }
    });
  
    box.addEventListener("mouseout", () => {
      skillName.textContent = ""; 
      skillDescription.textContent = ""; 
      skillDescriptionBox.style.opacity = 0; 
    });
  });
// Loader
  document.addEventListener("DOMContentLoaded", () => {
    battle();
  });
//Choose Character Loader
  document.addEventListener("DOMContentLoaded", function () {
    let heroIcons = document.querySelectorAll(".hero-icon");

    heroIcons.forEach(icon => {
        icon.addEventListener("click", function () {
          
            heroIcons.forEach(i => i.classList.remove("selected"));

            
            this.classList.add("selected");

            
            localStorage.setItem("selectedHero", this.querySelector("img").src);
        });
    });

    
    let savedHero = localStorage.getItem("selectedHero");
    if (savedHero) {
        heroIcons.forEach(icon => {
            if (icon.querySelector("img").src === savedHero) {
                icon.classList.add("selected");
            }
        });
    }
});

  // Battle Function
  function battle() {
    let atkFirst = turnOrder();
    hideSkills();
  
    if (atkFirst === player) {
      showSkills(); 
      playerTurn(); 
    } else {
      enemyTurn(); 
    }
  }


  // Turn Order
  function turnOrder() {
    let atkFirst = (player.spd > enemy.spd) ? player : enemy;
    return atkFirst;
  }

  // Player Turn 
  function playerTurn() {
    showSkills();
    chooseSkill();

}

    // Enemy Turn
    function enemyTurn() {

        hideSkills();

        let enemySkills = [enemy.skill1, enemy.skill2, enemy.skill4];
        let randomSkill = enemySkills[Math.floor(Math.random() * enemySkills.length)];
        
        useSkill(enemy, player, randomSkill);

        if (isDefeated()) return;

        setTimeout(() => {
          playerTurn();
          showSkills();
      }, 1000);
    }

    // Choose Skill
    function chooseSkill() {
      if(skillBoxes) {
        skillBoxes.forEach((box) => {
        
          if (box.dataset.skill === "skill3") {
            box.classList.add("inactive"); 
            box.removeEventListener("click", handleSkillClick); 
          } else {
            box.addEventListener("click", handleSkillClick, { once: true });
          }
        });
      }
    }
    
      function handleSkillClick(event) {
        let selectedBox = event.target.closest(".skill-box");
        let skillKey = selectedBox.dataset.skill;
        let selectedSkill = player[skillKey];

        hideSkills();
    
        useSkill(player, enemy, selectedSkill);
    
        skillBoxes.forEach(box => box.classList.remove('selected'));
        selectedBox.classList.add('selected');

        if (isDefeated()) return; 

        setTimeout(() => {
          if (!isDefeated()) {
              checkRelentlessSpirit();
          }
      }, 1000);
    
    }
    
  
  // Skill Usage
  function useSkill(user, target, skill) {
    if (!skill.multiplicator) return;

    let damage = user.atk * skill.multiplicator;
    let isCritical = isCrit(user.critRate);

    if (isCritical) {
        damage *= user.critDmg;
    }

    target.hp -= damage;
    if (target.hp < 0) target.hp = 0;


    if (target === player) {
        healthUpdate(player, ".player-minion .health-bar-status");
        animateDamage(".player-minion .minion-model-player", user); 
    } else {
        healthUpdate(enemy, ".enemy-minion .health-bar-status");
        animateDamage(".enemy-minion .minion-model-enemy", user); 
    }

    
    setTimeout(() => {
        if (isDefeated()) {
            endBattle();
        }
    }, 1000);
}


    // Check Relentless 
    function checkRelentlessSpirit() {
      let chance = Math.random() * 100;
    
      if (chance <= player.skill3.effect) {
        playerTurn(); 
      } else {
        if (!isDefeated()) { 
          setTimeout(enemyTurn, 1000);
      }
      }
    }

    // Health Update 
    function healthUpdate(target, barSelector) {
      let healthBar = document.querySelector(barSelector);
      if (healthBar) {
        let hpPercentage = (target.hp / target.maxHp) * 100;
        healthBar.style.width = `${hpPercentage}%`;
      }
    }
    
      
  
  // Crit verify
function isCrit(critRate) {
  return Math.floor(Math.random() * 100) + 1 < critRate;
}

// Hit Effect 
function animateDamage(targetSelector, attacker) {
  let target = document.querySelector(targetSelector);

  if (target) {
      target.classList.add("damage-effect");

      setTimeout(() => {
          target.classList.remove("damage-effect");
      }, 1000);

      if (isCrit(attacker.critRate)) {
          target.classList.add("crit-effect");

          setTimeout(() => {
              target.classList.remove("crit-effect");
          }, 300);
      }
  }
}
  

    

    // Enemy Turn - Disable Skills
    function hideSkills() {
        skillTable.style.display = "none"; 
    }
    
    function showSkills() {
        skillTable.style.display = "flex"; 
    }

    // End Battle
    function endBattle() {
      document.querySelectorAll(".character span").forEach(span => span.style.display = "none"); // Ascunde indicatorul
      alert(player.hp <= 0 ? "Enemy wins!" : "Player wins!");
      location.reload();
    }
    
    // check is defeated
    function isDefeated() {
      return player.hp <= 0 || enemy.hp <= 0;
    }

    function adjustHpBarPositions() {
      let playerModel = document.querySelector(".minion-model-player");
      let enemyModel = document.querySelector(".minion-model-enemy");
      let playerHpBar = document.querySelector(".player-minion .minion-health-bar");
      let enemyHpBar = document.querySelector(".enemy-minion .minion-health-bar");
  
      if (playerModel && playerHpBar) {
          let playerHeight = playerModel.clientHeight;
          playerHpBar.style.top = `-${playerHeight * 0.3}px`; 
      }
  
      if (enemyModel && enemyHpBar) {
          let enemyHeight = enemyModel.clientHeight;
          enemyHpBar.style.top = `-${enemyHeight * 0.4}px`; 
      }
  }
  
  // calls function
  window.addEventListener("load", adjustHpBarPositions);
  window.addEventListener("resize", adjustHpBarPositions);