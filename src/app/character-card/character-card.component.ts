import { Component, Input } from '@angular/core';
import { Character } from '../model/character';

@Component({
  selector: 'app-character-card',
  imports: [],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.scss'
})
export class CharacterCardComponent {
  @Input() character!: Character;
}
