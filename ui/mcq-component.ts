import { CUSTOM_EVENTS, EventBusComponent } from '@/events/event-bus-component';
import { GameObjects, Scene } from 'phaser';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number; // 0-based index
}

interface QuestionTrigger {
  type: 'score' | 'enemy' | 'time' | 'manual';
  value?: number; // score threshold, enemy count, etc.
}

export class MCQComponent extends GameObjects.Container {
  #eventBusComponent: EventBusComponent;
  #scoreComponent: any; // Will be injected
  #currentQuestion: Question | null = null;
  #mcqCard: GameObjects.Container | null = null;
  #isGamePaused: boolean = false;
  #questionBank: Question[] = [
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1
    },
    {
      question: "What is 15 + 27?",
      options: ["40", "41", "42", "43"],
      correctAnswer: 2
    },
    {
      question: "Which programming language is this game written in?",
      options: ["Python", "Java", "TypeScript", "C++"],
      correctAnswer: 2
    },
    {
      question: "What does CPU stand for?",
      options: ["Central Processing Unit", "Computer Processing Unit", "Central Program Unit", "Computer Program Unit"],
      correctAnswer: 0
    }
  ];

  constructor(scene: Scene, eventBusComponent: EventBusComponent) {
    super(scene, 0, 0, []);
    this.#eventBusComponent = eventBusComponent;
    this.scene.add.existing(this);
    this.setDepth(1000); // Ensure it's on top

    // Listen for ASK_QUESTION events
    this.#eventBusComponent.on(CUSTOM_EVENTS.ASK_QUESTION, (trigger?: QuestionTrigger) => {
      this.showQuestion(trigger);
    });
  }

  setScoreComponent(scoreComponent: any): void {
    this.#scoreComponent = scoreComponent;
  }

  private showQuestion(trigger?: QuestionTrigger): void {
    console.log('Showing question with trigger:', trigger);
    
    // Pause the game using custom method
    this.pauseGame();

    // Select a random question from the question bank
    const randomIndex = Math.floor(Math.random() * this.#questionBank.length);
    this.#currentQuestion = this.#questionBank[randomIndex];
    console.log('Selected question:', this.#currentQuestion);

    this.createMCQCard(trigger);
  }

  private pauseGame(): void {
    console.log('Pausing game - stopping all enemies and player movement');
    this.#isGamePaused = true;
    
    // Pause physics world to stop all movement
    this.scene.physics.world.pause();
    
    // Pause all timers to stop enemy spawning and other timed events
    this.scene.time.paused = true;
    
    // Pause enemy spawning specifically
    this.#eventBusComponent.emit(CUSTOM_EVENTS.PAUSE_ENEMY_SPAWNING);
  }

  private resumeGame(): void {
    console.log('Resuming game - enemies and player can move again');
    this.#isGamePaused = false;
    
    // Resume physics world
    this.scene.physics.world.resume();
    
    // Resume all timers
    this.scene.time.paused = false;
    
    // Resume enemy spawning
    this.#eventBusComponent.emit(CUSTOM_EVENTS.RESUME_ENEMY_SPAWNING);
  }

  private createMCQCard(trigger?: QuestionTrigger): void {
    console.log('Creating MCQ card');
    if (!this.#currentQuestion) {
      console.log('No current question available');
      return;
    }

    const centerX = this.scene.scale.width / 2;
    const centerY = this.scene.scale.height / 2;

    // Create the card container
    this.#mcqCard = this.scene.add.container(centerX, centerY);
    console.log('Created MCQ card container');

    // Background rectangle
    const bg = this.scene.add.rectangle(0, 0, 400, 320, 0x000000, 0.9)
      .setOrigin(0.5)
      .setStrokeStyle(2, 0xffffff);

    // Trigger info text (if provided)
    let triggerText: GameObjects.Text | null = null;
    if (trigger) {
      let triggerMessage = '';
      switch (trigger.type) {
        case 'score':
          triggerMessage = `🎯 Score Milestone: ${trigger.value} points!`;
          break;
        case 'enemy':
          triggerMessage = `👾 ${trigger.value} enemies destroyed!`;
          break;
        case 'time':
          triggerMessage = '⏰ Time-based question!';
          break;
        case 'manual':
          triggerMessage = '🎮 Manual trigger!';
          break;
      }
      
      triggerText = this.scene.add.text(0, -120, triggerMessage, {
        fontSize: '16px',
        color: '#ffaa00',
        align: 'center'
      }).setOrigin(0.5);
    }

    // Question text
    const questionText = this.scene.add.text(0, -80, this.#currentQuestion.question, {
      fontSize: '20px',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: 350 }
    }).setOrigin(0.5);

    // Create option buttons
    const options: GameObjects.Text[] = [];
    const optionLabels = ['A', 'B', 'C', 'D'];

    this.#currentQuestion.options.forEach((option, index) => {
      const optionText = this.scene.add.text(0, -40 + (index * 40), `${optionLabels[index]}. ${option}`, {
        fontSize: '18px',
        color: '#ffffff',
        backgroundColor: '#333333',
        padding: { x: 20, y: 10 }
      }).setOrigin(0.5);

      // Make it interactive
      optionText.setInteractive({ useHandCursor: true });

      // Add hover effects
      optionText.on('pointerover', () => {
        optionText.setBackgroundColor('#555555');
        console.log('Hovering over option:', index);
      });

      optionText.on('pointerout', () => {
        optionText.setBackgroundColor('#333333');
      });

      // Handle click
      optionText.on('pointerdown', () => {
        console.log('Option clicked:', index);
        this.handleAnswerSelection(index);
      });

      options.push(optionText);
    });

    // Add all elements to the card
    const cardElements = [bg, questionText, ...options];
    if (triggerText) {
      cardElements.unshift(triggerText);
    }
    this.#mcqCard.add(cardElements);

    // Add keyboard controls as backup
    this.addKeyboardControls();
  }

  private addKeyboardControls(): void {
    // Add keyboard controls for answer selection
    this.scene.input.keyboard?.on('keydown-ONE', () => {
      console.log('Key 1 pressed - selecting option 0');
      this.handleAnswerSelection(0);
    });
    this.scene.input.keyboard?.on('keydown-TWO', () => {
      console.log('Key 2 pressed - selecting option 1');
      this.handleAnswerSelection(1);
    });
    this.scene.input.keyboard?.on('keydown-THREE', () => {
      console.log('Key 3 pressed - selecting option 2');
      this.handleAnswerSelection(2);
    });
    this.scene.input.keyboard?.on('keydown-FOUR', () => {
      console.log('Key 4 pressed - selecting option 3');
      this.handleAnswerSelection(3);
    });
  }

  private handleAnswerSelection(selectedIndex: number): void {
    console.log('handleAnswerSelection called with index:', selectedIndex);
    
    if (!this.#currentQuestion || !this.#mcqCard) {
      console.log('Missing question or card:', { question: !!this.#currentQuestion, card: !!this.#mcqCard });
      return;
    }

    const isCorrect = selectedIndex === this.#currentQuestion.correctAnswer;
    console.log('Answer is correct:', isCorrect);

    if (isCorrect) {
      // Add bonus points for correct answer
      if (this.#scoreComponent && typeof this.#scoreComponent.addBonus === 'function') {
        console.log('Adding bonus points');
        this.#scoreComponent.addBonus(50);
      }
    }

    // Destroy the MCQ card safely
    console.log('Destroying MCQ card and resuming game');
    if (this.#mcqCard) {
      this.#mcqCard.destroy();
    }
    this.#mcqCard = null;
    this.#currentQuestion = null;

    // Resume the game
    this.resumeGame();
    
    // Reset the question active flag in the game scene
    if (this.scene && typeof (this.scene as any).resetQuestionActiveFlag === 'function') {
      (this.scene as any).resetQuestionActiveFlag();
    }
  }

  destroy(): void {
    this.#eventBusComponent.off(CUSTOM_EVENTS.ASK_QUESTION);
    super.destroy();
  }
}