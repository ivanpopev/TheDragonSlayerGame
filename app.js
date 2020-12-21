const getRandomValue = (max, min) => {
  return Math.floor(Math.random() * (max - min) + min);
};
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      dragonHealth: 100,
      currentRound: 0,
      result: "",
      logMessages: [],
    };
  },
  computed: {
    playerHealthBar() {
      if (this.playerHealth < 0) {
        return { width: 0 + "%" };
      }
      return { width: this.playerHealth + "%" };
    },
    monsterHealthBar() {
      if (this.dragonHealth < 0) {
        return { width: 0 + "%" };
      }
      return { width: this.dragonHealth + "%" };
    },
    disabledStatus() {
      return this.currentRound % 3 != 0;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.result = "draw";
      } else if (value < 0) {
        //Monster win
        this.result = "dragon";
      }
    },
    dragonHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        //Draw
        this.result = "draw";
      } else if (value <= 0) {
        //Player win
        this.result = "player";
      }
    },
  },
  methods: {
    startNewGame() {
      this.playerHealth = 100;
      this.dragonHealth = 100;
      this.currentRound = 0;
      this.result = "";
      this.logMessages = [];
    },
    attackDragon() {
      this.currentRound++;
      const attackValue = getRandomValue(12, 5);
      this.dragonHealth = this.dragonHealth - attackValue;
      this.addLogMessage("Player", "Attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(25, 15);
      this.playerHealth = this.playerHealth - attackValue;
      this.addLogMessage("Dragon", "Attack", attackValue);
    },
    specialAttack() {
      this.currentRound++;
      const attackValue = getRandomValue(40, 25);
      this.dragonHealth = this.dragonHealth - attackValue;
      this.addLogMessage("Player", "Special-Attack", attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(35, 25);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth = this.playerHealth + healValue;
      }
      this.addLogMessage("Player", "Heal", healValue);
      this.attackPlayer();
    },
    surrender() {
      this.result = "dragon";
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});

app.mount("#game");
