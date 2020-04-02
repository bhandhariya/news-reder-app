import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

export interface NewsSource {
  id: number;
  name: string;
  val:string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'yoga1';

  
  p: number = 1;
  collection: any[] ;



  query;
  // constructor(private http:HttpClient){}
  search(){
console.log(this.query)

this.http.post('http://localhost:3000/users/getnews',{title:this.query}).subscribe(this.cb)



  }

newsResult;

cb=(res)=>{
  console.log(res);
  this.newsResult=res;
  this.collection = this.newsResult
}



form: FormGroup;
newssource: NewsSource[] = [
  { id: 0, name: 'ABC News', val : 'abc-news' },
  { id: 1, name: 'BBC News', val : 'bbc-news' },
  { id: 2, name: 'BBC Sport' , val : 'bbc-sport' },
  { id: 3, name: 'Business Insider', val : 'business-insider' },
  { id: 4, name: 'Buzzfeed', val : 'buzzfeed' },
  { id: 5, name: 'CNBC', val : 'cnbc' },
  { id: 6, name: 'CNN', val : 'cnn' },
  { id: 7, name: 'ESPN', val : 'espn' },
];

constructor(private fb: FormBuilder,private http:HttpClient) { }

onChange(name: string, isChecked: boolean) {
  const newssources = (this.form.controls.name as FormArray);

  if (isChecked) {
    newssources.push(new FormControl(name));
  } else {
    const index = newssources.controls.findIndex(x => x.value === name);
    newssources.removeAt(index);
  }
}

ngOnInit() {
  this.form = this.fb.group({
    name: this.fb.array([])
  });
}

submit() {
  // console.log(this.form.value.name);
  var obj={
    sources:this.form.value.name,
    query:this.query
  }
  console.log(obj)
  this.http.post('http://localhost:3000/users/getnews',obj).subscribe(this.cb)
}

}
