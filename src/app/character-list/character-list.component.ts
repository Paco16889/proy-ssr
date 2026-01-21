import { Component, inject } from '@angular/core';
import { Character } from '../model/character';
import { CharacterCardComponent } from "../character-card/character-card.component";
import { DragonballService } from '../dragonball.service';

@Component({
  selector: 'app-character-list',
  imports: [CharacterCardComponent],
  templateUrl: './character-list.component.html',
  styleUrl: './character-list.component.scss'
})
export class CharacterListComponent {
  characters: Character[] = [];
  private dragonballService = inject(DragonballService);
  

  ngOnInit() {
    this.dragonballService.getCharacters().subscribe(data => {
      this.characters = data;
    });
  }
}
