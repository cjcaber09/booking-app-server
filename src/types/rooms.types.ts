export interface RoomTypes {
  id: number;
  name: string;
  capacity: number;
  price: number;
  user_id: number;
  description?: string;
  featuredImage?: string;
  amenities?: string[];
  images?: string[];
  created_at?: Date;
  updated_at?: Date;
}

export interface amenityType {
  name: string;
  description?: string;
}

export interface imageType {
  url: string;
  alt?: string;
}

export type CreateRoomType = Omit<
  RoomTypes,
  "id" | "created_at" | "updated_at"
>;

export type UpdateRoomType = Partial<
  Omit<RoomTypes, "id" | "user_id" | "created_at" | "updated_at">
>;

export type RoomSuccessResponse = Omit<RoomTypes, "created_at" | "updated_at">;

export type RoomListResponse = RoomSuccessResponse[];

export type RoomIdParam = Pick<RoomTypes, "id">;