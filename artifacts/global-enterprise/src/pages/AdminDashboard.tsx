import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  useGetDashboardStats,
  getGetDashboardStatsQueryKey,
  useListApplications,
  getListApplicationsQueryKey,
  useExportApplicationsCsv,
  getExportApplicationsCsvQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { FaSignOutAlt, FaFileDownload, FaUsers, FaClipboardList, FaFilter, FaGlobeAsia, FaEye } from "react-icons/fa";

const SERVICES = [
  "Air Ticket Booking",
  "Train Ticket Booking",
  "International Parcel Booking",
  "PAN Card Apply",
  "Aadhaar Card Services",
  "Voter Card Apply",
];

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [serviceFilter, setServiceFilter] = useState<string>("");
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setLocation("/admin/login");
    }
  }, [setLocation]);

  const { data: stats, isLoading: statsLoading } = useGetDashboardStats({
    query: { queryKey: getGetDashboardStatsQueryKey() },
  });

  const listParams = serviceFilter ? { service: serviceFilter } : {};
  const { data: applicationsData, isLoading: appsLoading } = useListApplications(listParams, {
    query: { queryKey: getListApplicationsQueryKey(listParams) },
  });

  const exportCsvParams = serviceFilter ? { service: serviceFilter } : {};
  const { refetch: fetchCsv, isFetching: exportLoading } = useExportApplicationsCsv(exportCsvParams, {
    query: {
      queryKey: getExportApplicationsCsvQueryKey(exportCsvParams),
      enabled: false,
    },
  });

  async function handleExport() {
    const result = await fetchCsv();
    if (result.data) {
      const blob = new Blob([result.data as unknown as string], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `applications${serviceFilter ? `-${serviceFilter}` : ""}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  function handleLogout() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUsername");
    queryClient.clear();
    setLocation("/admin/login");
  }

  const username = localStorage.getItem("adminUsername") ?? "Admin";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Admin Header */}
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <FaGlobeAsia className="text-2xl" />
              <div>
                <span className="font-bold text-lg">Global Enterprise</span>
                <span className="text-primary-foreground/70 text-xs ml-2">Admin Panel</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-primary-foreground/80 hidden sm:block">
                Welcome, <strong>{username}</strong>
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 gap-2"
              >
                <FaSignOutAlt />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 lg:px-8 py-8 max-w-7xl">
        <h1 className="text-2xl font-bold text-slate-900 mb-8">Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={FaClipboardList}
            label="Total Applications"
            value={statsLoading ? null : (stats?.totalApplications ?? 0)}
            color="bg-primary/10 text-primary"
          />
          <StatCard
            icon={FaEye}
            label="Total Visitors"
            value={statsLoading ? null : (stats?.visitorCount ?? 0)}
            color="bg-green-100 text-green-700"
          />
          <StatCard
            icon={FaUsers}
            label="Services Offered"
            value={6}
            color="bg-amber-100 text-amber-700"
          />
        </div>

        {/* Service Breakdown */}
        {!statsLoading && stats?.applicationsByService && stats.applicationsByService.length > 0 && (
          <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 mb-8">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Applications by Service</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {stats.applicationsByService.map((item) => (
                <div key={item.service} className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3">
                  <span className="text-sm text-slate-700 font-medium truncate mr-2">{item.service}</span>
                  <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex-shrink-0">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Applications Table */}
        <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-slate-900">All Applications</h2>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <FaFilter className="text-slate-400 text-sm" />
                <Select value={serviceFilter} onValueChange={setServiceFilter}>
                  <SelectTrigger className="w-52 h-9 text-sm">
                    <SelectValue placeholder="Filter by service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Services</SelectItem>
                    {SERVICES.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleExport}
                disabled={exportLoading}
                className="gap-2 h-9"
              >
                <FaFileDownload className="text-sm" />
                {exportLoading ? "Exporting..." : "Export CSV"}
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            {appsLoading ? (
              <div className="p-6 space-y-3">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full rounded-lg" />
                ))}
              </div>
            ) : !applicationsData?.applications?.length ? (
              <div className="py-16 text-center text-slate-500">
                <FaClipboardList className="text-4xl mx-auto mb-3 text-slate-300" />
                <p className="font-medium">No applications yet</p>
                <p className="text-sm mt-1">Applications submitted through the website will appear here.</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="text-left py-3 px-6 font-semibold text-slate-600 uppercase tracking-wider text-xs">Name</th>
                    <th className="text-left py-3 px-6 font-semibold text-slate-600 uppercase tracking-wider text-xs">Phone</th>
                    <th className="text-left py-3 px-6 font-semibold text-slate-600 uppercase tracking-wider text-xs">Service</th>
                    <th className="text-left py-3 px-6 font-semibold text-slate-600 uppercase tracking-wider text-xs hidden md:table-cell">Message</th>
                    <th className="text-left py-3 px-6 font-semibold text-slate-600 uppercase tracking-wider text-xs hidden lg:table-cell">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {applicationsData.applications.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-slate-900">{app.name}</td>
                      <td className="py-4 px-6 text-slate-700">{app.phone}</td>
                      <td className="py-4 px-6">
                        <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap">
                          {app.service}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-slate-500 hidden md:table-cell max-w-xs truncate">
                        {app.message ?? <span className="text-slate-300 italic">—</span>}
                      </td>
                      <td className="py-4 px-6 text-slate-500 hidden lg:table-cell whitespace-nowrap">
                        {new Date(app.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {applicationsData && (
            <div className="px-6 py-3 border-t border-slate-100 text-xs text-slate-500 bg-slate-50">
              Showing {applicationsData.applications.length} of {applicationsData.total} application
              {applicationsData.total !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: number | null;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 flex items-center gap-5">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon className="text-2xl" />
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium mb-1">{label}</p>
        {value === null ? (
          <Skeleton className="h-8 w-16 rounded" />
        ) : (
          <p className="text-3xl font-bold text-slate-900">{value.toLocaleString()}</p>
        )}
      </div>
    </div>
  );
}
