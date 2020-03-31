import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

export interface Cartoon {
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

  




  query;
  // constructor(private http:HttpClient){}
  search(){
console.log(this.query)

this.http.post('http://localhost:3000/users/getnews',{title:this.query}).subscribe(this.cb)



  }

cb=(res)=>{
  console.log(res)
}



form: FormGroup;
cartoonsData: Cartoon[] = [
  { id: 0, name: 'ABC News', val : 'abc-news' },
  { id: 1, name: 'BBC News', val : 'bbc-news' },
  { id: 2, name: 'BBC Sport' , val : 'bbc-sport' },
  { id: 3, name: 'ESPN', val : 'espn' }
];

constructor(private fb: FormBuilder,private http:HttpClient) { }

onChange(name: string, isChecked: boolean) {
  const cartoons = (this.form.controls.name as FormArray);

  if (isChecked) {
    cartoons.push(new FormControl(name));
  } else {
    const index = cartoons.controls.findIndex(x => x.value === name);
    cartoons.removeAt(index);
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
