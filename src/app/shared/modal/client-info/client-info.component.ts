import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgxSpinnerService} from "ngx-spinner";
import {Client} from "../../../_model/client";
import {Colis} from "../../../_model/colis";
import {COLIS_FIND_BY_CLIENT__PAGEABLE__GET} from "../../../_api_config/route-api";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ClientAddComponent} from "../client-add/client-add.component";
import {ColisAddComponent} from "../colis-add/colis-add.component";
import {ColisViewDetailComponent} from "../colis-view-detail/colis-view-detail.component";

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.scss']
})
export class ClientInfoComponent implements OnInit {

  pages = 0;
  size = 25;
  length = 0;
  displayedColumnsColis: string[] = ['code', 'name', 'poids', 'nature','valeur','propretaire','destinataire','dateLastUpdate','montant','quantity','total', 'action'];
  dataSourceColis: MatTableDataSource<Colis> = new MatTableDataSource<Colis>();
  @ViewChild("colisPaginator", {static: true}) paginatorColis: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private dialogRef: MatDialogRef<ClientInfoComponent>,
              @Inject(MAT_DIALOG_DATA) public client: Client,
              private http: HttpClient,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.findColisByClient();
  }

  findColisByClient() {
    this.http.get<any>(`${COLIS_FIND_BY_CLIENT__PAGEABLE__GET}clientId=${this.client.id}&page=${this.pages}&size=${this.size}`).subscribe(data=>{
      this.length = data.totalElements;
      this.dataSourceColis.data = data.content;
      this.dataSourceColis.sort = this.sort;
      this.dataSourceColis.paginator = this.paginatorColis;
    })
  }

  close() {
    this.dialogRef.close();
  }

  updateClient() {
    this.dialog.open(ClientAddComponent, {
      data: this.client,
      width: '600px'
    })
  }

  applyFilterColis(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceColis.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceColis.paginator) {
      this.dataSourceColis.paginator.firstPage();
    }
  }


  colisSave(item: Colis) {
    if (!item) {
      item = new Colis();
      item.client = this.client;
    }

    if(item.archiver)
      return;

    this.dialog.open(ColisAddComponent, {
      width: '850px',
      data: item,
      disableClose: true
    });

  }

  seeDetailColis(element: Colis) {
   this.dialog.open(ColisViewDetailComponent, {
      data: element,
      width: '1000px',
    })
  }

  setPageColis(event: PageEvent) {
    if (event.pageIndex != this.pages) {
      this.pages = event.pageIndex;
      this.size = event.pageSize;
      this.findColisByClient();
    }
  }
}
