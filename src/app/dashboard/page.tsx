import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getWorkoutsForDate } from "@/data/workouts";
import { DatePicker } from "./DatePicker";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ date?: string }>;
}) {
  const { date: dateParam } = await searchParams;
  const date = dateParam ? new Date(`${dateParam}T00:00:00`) : new Date();

  const workouts = await getWorkoutsForDate(date);

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Showing workouts for</span>
        <DatePicker selected={date} />
      </div>

      <div className="space-y-3">
        {workouts.length === 0 ? (
          <p className="text-muted-foreground text-sm">No workouts logged for this date.</p>
        ) : (
          workouts.map((workout) => (
            <Card key={workout.id}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">{workout.name ?? "Workout"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {workout.exercises.map((exercise) => (
                  <div key={exercise.name}>
                    <p className="text-sm font-medium">{exercise.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {exercise.sets.map((s) =>
                        [s.reps && `${s.reps} reps`, s.weightKg && `${s.weightKg}kg`]
                          .filter(Boolean)
                          .join(" @ ")
                      ).join(" · ")}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
