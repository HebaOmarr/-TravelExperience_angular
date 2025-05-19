import { Injectable, OnInit } from '@angular/core';
import { IPost } from '../Interface/IPost';

@Injectable({
  providedIn: 'root'
})
export class StaticPostServiceService implements OnInit
{
  posts!:IPost[];
  constructor() {
    this.posts = [
      {
        PostId:1,
        PlaceImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        PlaceName: "Maldives Beach",
        Rate: 4.8,
        PostText:"hellow"
      },
      {
        PostId:2,
        PlaceImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        PlaceName: "Swiss Alps",
        Rate: 4.9,
        PostText:"hellow"
      },
      {
        PostId:3,
        PlaceImage: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
        PlaceName: "New York City",
        Rate: 4.7,
        PostText:"hellow"
      },
      {
        PostId:4,
        PlaceImage: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef",
        PlaceName: "Santorini, Greece",
        Rate: 4.8,
        PostText:"hellow"
      },
      {
        PostId:5,
        PlaceImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
        PlaceName: "Tokyo, Japan",
        Rate: 4.6,
        PostText:"hellow"
      },
      {
        PostId:6,
        PlaceImage: "https://images.unsplash.com/photo-1549887534-459f4d5e99ab",
        PlaceName: "Sydney Opera House",
        Rate: 4.7,
        PostText:"hellow"
      },
      {
        PostId:7,
        PlaceImage: "https://images.unsplash.com/photo-1586162544282-7633f0db5d23",
        PlaceName: "Desert Safari, Dubai",
        Rate: 4.5,
        PostText:"hellow"
      },
      {
        PostId:8,
        PlaceImage: "https://images.unsplash.com/photo-1543248939-067f6a38f8c1",
        PlaceName: "Cappadocia, Turkey",
        Rate: 4.9,
        PostText:"hellow"
      },
      {
        PostId:9,
        PlaceImage: "https://images.unsplash.com/photo-1551907234-498ba58f21d4",
        PlaceName: "Paris, France",
        Rate: 4.9,
        PostText:"hellow"
      },
      {
        PostId:10,
        PlaceImage: "https://images.unsplash.com/photo-1534081333815-ae5019106628",
        PlaceName: "Rio de Janeiro, Brazil",
        Rate: 4.6,
        PostText:"hellow"
      }
    ];
  }
  

  ngOnInit(): void {
   
  }

  Filter(keyword : string) : IPost[]
  {
    return this.posts.filter((item) => item.PlaceName.toLowerCase().includes(keyword));
  }

  getAllPosts(page:number , pageSize:number):IPost[]
  {
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return this.posts.slice(startIndex, endIndex);
  }
}
