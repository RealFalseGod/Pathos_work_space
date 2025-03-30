import AsyncStorage from '@react-native-async-storage/async-storage';

type Task = {
  frequency: "Daily" | "Weekly" | "Monthly" | "Annually";
  dueDate: string;
  status: string;
};

export const resetScheduledTasks = async () => {
  try {
    const storedTasks = await AsyncStorage.getItem('tasks');
    if (storedTasks) {
      const tasks: Task[] = JSON.parse(storedTasks);
      const currentDate = new Date();
      const updatedTasks = tasks.map((task) => {
        if (task.frequency === "Daily" && isTaskDue(task.dueDate, currentDate, 1)) {
          return { ...task, status: "Pending" };
        }
        if (task.frequency === "Weekly" && isTaskDue(task.dueDate, currentDate, 7)) {
          return { ...task, status: "Pending" };
        }
        if (task.frequency === "Monthly" && isTaskDue(task.dueDate, currentDate, 30)) {
          return { ...task, status: "Pending" };
        }
        if (task.frequency === "Annually" && isTaskDue(task.dueDate, currentDate, 365)) {
          return { ...task, status: "Pending" };
        }
        return task;
      });
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
      console.log('[Scheduled] Tasks reset successfully');
    }
  } catch (error) {
    console.error('[Scheduled] Failed to reset tasks', error);
  }
};

export const isTaskDue = (dueDate: string, currentDate: Date, intervalDays: number) => {
  const due = new Date(dueDate);
  const differenceInTime = currentDate.getTime() - due.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return differenceInDays >= intervalDays;
};
export default {
    resetScheduledTasks,
    isTaskDue,
  };