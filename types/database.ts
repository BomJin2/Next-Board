export interface Boards {
  border_id: string | number;
  created_at: Date;
  title: string;
  start_date: Date | string;
  end_date: Date | string;
  description: string;
  ischecked: boolean;
}

export interface Task {
  id: number;
  title: string;
  startDate: string | Date;
  endDate: string | Date;
  boards: BoardContent[];
}

export interface BoardContent {
  boardId: string | number;
  isCompleted: boolean;
  title: string;
  startDate: Date | string;
  endDate: Date | string;
  content: string;
}
