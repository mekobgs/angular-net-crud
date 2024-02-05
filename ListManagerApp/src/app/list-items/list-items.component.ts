import { Component, OnInit } from '@angular/core';
import { ListItemsService } from '../list-items.service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-list-items',
  templateUrl: './list-items.component.html',
  styleUrls: ['./list-items.component.css'],
  standalone: true,
  imports: [FormsModule ]
})
export class ListItemsComponent implements OnInit {
  items: any[] = [];
  newItemName: string = '';

  constructor(private listItemsService: ListItemsService) { }

  ngOnInit(): void {
    this.getListItems();
  }

  getListItems(): void {
    this.listItemsService.getListItems().subscribe(items => {
      this.items = items;
    });
  }

  addItem(): void {
    if (!this.newItemName.trim()) return;
    this.listItemsService.addListItem({ name: this.newItemName })
      .subscribe(() => {
        this.getListItems(); // Refresh the list
        this.newItemName = ''; // Clear the input field
      });
  }

  editItemId: number | null = null;
  editedItemName: string = '';

  startEdit(item: any): void {
      this.editItemId = item.id;
      this.editedItemName = item.name;
  }

  cancelEdit(): void {
      this.editItemId = null;
      this.editedItemName = '';
  }

  saveEdit(item: any): void {
      if (!this.editedItemName.trim()) return;
      this.listItemsService.updateListItem(item.id, { ...item, name: this.editedItemName })
          .subscribe(() => {
              this.getListItems(); // Refresh the list
              this.cancelEdit();
          });
  }

  deleteItem(id: number): void {
      this.listItemsService.deleteListItem(id).subscribe(() => {
          this.getListItems(); // Refresh the list
      });
  }
}