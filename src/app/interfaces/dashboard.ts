export interface Dashboard {
    id: number,
    name: string,
    users_resolved: number,
    active: boolean,
    image_url: string
}

export interface Bar {
  data: {
    agreeableness: number
    drive: number,
    luck: number,
    openness: number
  },
  "type": "bar"
}
