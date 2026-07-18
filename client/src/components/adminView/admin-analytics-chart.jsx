const AdminAnalyticsChart = ({ data = [] }) => {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Growth Snapshot</h3>
          <p className="text-sm text-muted-foreground">Key admin metrics for the current platform view.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {data.map((item) => (
          <div key={item.label} className="space-y-2 rounded-xl border bg-muted/20 p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-semibold text-foreground">{item.value}</span>
            </div>
            <div className="h-24 rounded-lg bg-white p-2">
              <div className="flex h-full items-end gap-2">
                <div
                  className="w-full rounded-md bg-gradient-to-t from-primary to-violet-400"
                  style={{ height: `${Math.max((item.value / maxValue) * 100, 12)}%` }}
                  title={`${item.label}: ${item.value}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAnalyticsChart;
