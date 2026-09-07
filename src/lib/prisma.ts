import { seedCareers, seedResources, seedOpportunities } from '../data/seed.ts';
import { Career, Resource, Opportunity, ContactMessage } from '../types.ts';

// In-memory data store with persistent initialization from seed data
class DatabaseStore {
  private careers: Career[] = [...seedCareers];
  private resources: Resource[] = [...seedResources];
  private opportunities: Opportunity[] = [...seedOpportunities];
  private contactMessages: ContactMessage[] = [
    {
      id: 'msg-seed-1',
      name: 'Aditya Sharma',
      email: 'aditya.sharma@example.com',
      subject: 'Inquiry about Career Mentorship',
      message: 'Hello, I am a final-year CS undergrad looking for guidance on transitioning into cybersecurity roles. Thank you!',
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    }
  ];

  // Career operations matching Prisma Client API
  career = {
    findMany: async (args?: { where?: { category?: string; search?: string } }): Promise<Career[]> => {
      let list = [...this.careers];
      if (args?.where?.category && args.where.category.toLowerCase() !== 'all') {
        const cat = args.where.category.toLowerCase();
        list = list.filter(c => c.category.toLowerCase() === cat);
      }
      if (args?.where?.search) {
        const q = args.where.search.toLowerCase();
        list = list.filter(c => 
          c.title.toLowerCase().includes(q) || 
          c.description.toLowerCase().includes(q) ||
          c.skills.some(s => s.toLowerCase().includes(q))
        );
      }
      return list;
    },
    findUnique: async (args: { where: { id?: string; slug?: string } }): Promise<Career | null> => {
      const match = this.careers.find(c => 
        (args.where.id && c.id === args.where.id) || 
        (args.where.slug && c.slug === args.where.slug)
      );
      return match || null;
    }
  };

  // Resource operations matching Prisma Client API
  resource = {
    findMany: async (args?: { where?: { category?: string; search?: string } }): Promise<Resource[]> => {
      let list = [...this.resources];
      if (args?.where?.category && args.where.category.toLowerCase() !== 'all') {
        const cat = args.where.category.toLowerCase();
        list = list.filter(r => r.category.toLowerCase() === cat);
      }
      if (args?.where?.search) {
        const q = args.where.search.toLowerCase();
        list = list.filter(r => 
          r.title.toLowerCase().includes(q) || 
          r.description.toLowerCase().includes(q)
        );
      }
      return list;
    },
    findUnique: async (args: { where: { id: string } }): Promise<Resource | null> => {
      const match = this.resources.find(r => r.id === args.where.id);
      return match || null;
    }
  };

  // Opportunity operations matching Prisma Client API
  opportunity = {
    findMany: async (args?: { where?: { type?: string; workMode?: string; search?: string } }): Promise<Opportunity[]> => {
      let list = [...this.opportunities];
      if (args?.where?.type && args.where.type.toLowerCase() !== 'all') {
        const t = args.where.type.toLowerCase();
        list = list.filter(o => o.type.toLowerCase() === t);
      }
      if (args?.where?.workMode && args.where.workMode.toLowerCase() !== 'all') {
        const wm = args.where.workMode.toLowerCase();
        list = list.filter(o => o.workMode.toLowerCase() === wm);
      }
      if (args?.where?.search) {
        const q = args.where.search.toLowerCase();
        list = list.filter(o => 
          o.title.toLowerCase().includes(q) || 
          o.company.toLowerCase().includes(q) ||
          o.location.toLowerCase().includes(q)
        );
      }
      return list;
    },
    findUnique: async (args: { where: { id: string } }): Promise<Opportunity | null> => {
      const match = this.opportunities.find(o => o.id === args.where.id);
      return match || null;
    }
  };

  // ContactMessage operations matching Prisma Client API
  contactMessage = {
    create: async (args: { data: { name: string; email: string; subject: string; message: string } }): Promise<ContactMessage> => {
      const newMsg: ContactMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        name: args.data.name.trim(),
        email: args.data.email.trim(),
        subject: args.data.subject.trim(),
        message: args.data.message.trim(),
        createdAt: new Date().toISOString()
      };
      this.contactMessages.unshift(newMsg);
      return newMsg;
    },
    findMany: async (): Promise<ContactMessage[]> => {
      return [...this.contactMessages];
    }
  };
}

// Global singleton instance so state is preserved across requests
declare global {
  var prismaInstance: DatabaseStore | undefined;
}

export const prisma = global.prismaInstance || new DatabaseStore();
if (process.env.NODE_ENV !== 'production') {
  global.prismaInstance = prisma;
}

export default prisma;
