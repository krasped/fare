import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { UserTable } from "@/components/users/UserTable"
import { UserFilters } from "@/components/users/UserFilters"
import { UserEditDialog } from "@/components/users/UserEditDialog"
import { User } from "@/components/users/types"

const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    agency: "Top Realty",
    parentAgency: "Premier Group",
    role: "Agent",
    status: "Active",
    documentsComplete: true,
    subscriptionType: "Professional",
    subscriptionExpiry: "2024-12-31",
    documentsStatus: {
      complete: true
    },
    approvalStatus: "Approved"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+1 234 567 8901",
    agency: "Best Homes",
    parentAgency: "Premier Group",
    role: "Manager",
    status: "Active",
    documentsComplete: false,
    subscriptionType: "Basic",
    subscriptionExpiry: "2024-06-30",
    documentsStatus: {
      complete: false,
      missingDocs: ["License", "Insurance"]
    },
    approvalStatus: "Pending"
  },
]

export default function Users() {
  const [users, setUsers] = useState<User[]>(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<string>("all")
  const [agencyFilter, setAgencyFilter] = useState<string>("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { toast } = useToast()

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId))
    toast({
      title: "User Deleted",
      description: "The user has been successfully deleted.",
    })
  }

  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ))
  }

  const handleCreateUser = (newUser: User) => {
    setUsers([...users, newUser])
    setIsCreateDialogOpen(false)
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.agency.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesAgency = agencyFilter === "all" || user.agency === agencyFilter
    return matchesSearch && matchesRole && matchesAgency
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage users, roles, and permissions
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create User
            </Button>
          </DialogTrigger>
          <UserEditDialog onSave={handleCreateUser} onClose={() => setIsCreateDialogOpen(false)} />
        </Dialog>
      </div>

      <UserFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        agencyFilter={agencyFilter}
        onAgencyFilterChange={setAgencyFilter}
      />

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="professional">Professional</TabsTrigger>
          <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <UserTable
            users={filteredUsers}
            onDeleteUser={handleDeleteUser}
            onUpdateUser={handleUpdateUser}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}