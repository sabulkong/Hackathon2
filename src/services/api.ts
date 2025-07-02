import toast from 'react-hot-toast';

// Mock data storage
let mockMembers: Member[] = [
  {
    id: '1',
    name: 'Jane Wanjiku',
    phone: '+254712345678',
    email: 'jane.wanjiku@email.com',
    contribution: 5000,
    status: 'active',
    lastPayment: '2024-01-15',
    totalPaid: 45000,
    joinDate: '2023-02-10'
  },
  {
    id: '2',
    name: 'Peter Kimani',
    phone: '+254723456789',
    email: 'peter.kimani@email.com',
    contribution: 5000,
    status: 'pending',
    lastPayment: '2023-12-15',
    totalPaid: 40000,
    joinDate: '2023-01-15'
  },
  {
    id: '3',
    name: 'Mary Njeri',
    phone: '+254734567890',
    email: 'mary.njeri@email.com',
    contribution: 5000,
    status: 'overdue',
    lastPayment: '2023-11-15',
    totalPaid: 35000,
    joinDate: '2023-01-01'
  },
  {
    id: '4',
    name: 'John Mwangi',
    phone: '+254745678901',
    email: 'john.mwangi@email.com',
    contribution: 5000,
    status: 'active',
    lastPayment: '2024-01-15',
    totalPaid: 50000,
    joinDate: '2022-12-01'
  }
];

let mockPayments: Payment[] = [
  {
    id: '1',
    memberId: '1',
    memberName: 'Jane Wanjiku',
    amount: 5000,
    dueDate: '2024-01-15',
    paidDate: '2024-01-15',
    status: 'paid',
    method: 'M-Pesa',
    reference: 'REF001'
  },
  {
    id: '2',
    memberId: '2',
    memberName: 'Peter Kimani',
    amount: 5000,
    dueDate: '2024-01-15',
    status: 'pending'
  },
  {
    id: '3',
    memberId: '3',
    memberName: 'Mary Njeri',
    amount: 5000,
    dueDate: '2023-12-15',
    status: 'overdue'
  },
  {
    id: '4',
    memberId: '4',
    memberName: 'John Mwangi',
    amount: 5000,
    dueDate: '2024-01-15',
    paidDate: '2024-01-15',
    status: 'paid',
    method: 'Bank Transfer',
    reference: 'REF002'
  }
];

let mockReminders: Reminder[] = [
  {
    id: '1',
    name: 'Monthly Payment Reminder',
    template: 'Hi {name}, this is a friendly reminder that your monthly contribution of KES {amount} is due on {date}. Please make your payment to keep our chama strong! 💪',
    frequency: 'monthly',
    nextSend: '2024-02-01',
    recipients: 4,
    status: 'active'
  },
  {
    id: '2',
    name: 'Overdue Payment Alert',
    template: 'Hello {name}, your payment of KES {amount} is now overdue. Please settle your contribution as soon as possible to avoid penalties.',
    frequency: 'weekly',
    nextSend: '2024-01-22',
    recipients: 1,
    status: 'active'
  }
];

let mockSettings: Settings = {
  chamaName: 'Unity Savings Group',
  defaultContribution: 5000,
  paymentDueDay: 15,
  currency: 'KES',
  timezone: 'Africa/Nairobi',
  whatsappBusinessName: 'Unity Savings Group Bot',
  welcomeMessage: 'Welcome to Unity Savings Group! I\'m here to help you with payment reminders and updates.',
  autoResponse: true,
  readReceipts: true,
  mpesaBusinessNumber: '123456',
  bankAccountDetails: 'Bank: KCB Bank\nAccount: 1234567890\nName: Unity Savings Group'
};

// Types
export interface Member {
  id: string;
  name: string;
  phone: string;
  email: string;
  contribution: number;
  status: 'active' | 'pending' | 'overdue';
  lastPayment: string;
  totalPaid: number;
  joinDate: string;
}

export interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue' | 'upcoming';
  method?: string;
  reference?: string;
}

export interface Reminder {
  id: string;
  name: string;
  template: string;
  frequency: 'weekly' | 'monthly' | 'once';
  nextSend: string;
  recipients: number;
  status: 'active' | 'paused';
}

export interface Settings {
  chamaName: string;
  defaultContribution: number;
  paymentDueDay: number;
  currency: string;
  timezone: string;
  whatsappBusinessName: string;
  welcomeMessage: string;
  autoResponse: boolean;
  readReceipts: boolean;
  mpesaBusinessNumber: string;
  bankAccountDetails: string;
}

// Utility function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Generate unique ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// API Functions
export const apiService = {
  // Members API
  async getMembers(): Promise<Member[]> {
    await delay(500); // Simulate network delay
    return [...mockMembers];
  },

  async addMember(member: Omit<Member, 'id'>): Promise<Member> {
    await delay(300);
    const newMember: Member = {
      ...member,
      id: generateId()
    };
    mockMembers.push(newMember);
    toast.success('Member added successfully!');
    return newMember;
  },

  async updateMember(id: string, memberUpdate: Partial<Member>): Promise<Member> {
    await delay(300);
    const index = mockMembers.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error('Member not found');
    }
    mockMembers[index] = { ...mockMembers[index], ...memberUpdate };
    toast.success('Member updated successfully!');
    return mockMembers[index];
  },

  async deleteMember(id: string): Promise<void> {
    await delay(300);
    const index = mockMembers.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error('Member not found');
    }
    mockMembers.splice(index, 1);
    // Also remove related payments
    mockPayments = mockPayments.filter(p => p.memberId !== id);
    toast.success('Member deleted successfully!');
  },

  // Payments API
  async getPayments(): Promise<Payment[]> {
    await delay(500);
    return [...mockPayments];
  },

  async recordPayment(payment: Omit<Payment, 'id'>): Promise<Payment> {
    await delay(300);
    const newPayment: Payment = {
      ...payment,
      id: generateId()
    };
    mockPayments.push(newPayment);
    toast.success('Payment recorded successfully!');
    
    // Simulate WhatsApp confirmation
    console.log(`WhatsApp message sent to ${payment.memberName}: Great news! ✅ We've received your payment of KES ${payment.amount.toLocaleString()}. Thank you for keeping our chama strong! 🙌`);
    
    return newPayment;
  },

  async markPaymentAsPaid(paymentId: string, method: string, reference: string): Promise<void> {
    await delay(300);
    const index = mockPayments.findIndex(p => p.id === paymentId);
    if (index === -1) {
      throw new Error('Payment not found');
    }
    mockPayments[index] = {
      ...mockPayments[index],
      paidDate: new Date().toISOString(),
      method,
      reference,
      status: 'paid'
    };
    toast.success('Payment marked as paid!');
  },

  // Reminders API
  async getReminders(): Promise<Reminder[]> {
    await delay(500);
    return [...mockReminders];
  },

  async createReminder(reminder: Omit<Reminder, 'id'>): Promise<Reminder> {
    await delay(300);
    const newReminder: Reminder = {
      ...reminder,
      id: generateId()
    };
    mockReminders.push(newReminder);
    toast.success('Reminder created successfully!');
    return newReminder;
  },

  async sendReminder(reminderId: string): Promise<void> {
    await delay(500);
    const reminder = mockReminders.find(r => r.id === reminderId);
    if (!reminder) {
      throw new Error('Reminder not found');
    }
    console.log(`Sending reminder: ${reminder.name} to ${reminder.recipients} recipients`);
    toast.success('Reminders sent successfully!');
  },

  // Settings API
  async getSettings(): Promise<Settings> {
    await delay(300);
    return { ...mockSettings };
  },

  async updateSettings(settingsUpdate: Partial<Settings>): Promise<Settings> {
    await delay(300);
    mockSettings = { ...mockSettings, ...settingsUpdate };
    toast.success('Settings updated successfully!');
    return { ...mockSettings };
  },

  // WhatsApp API (Mock implementation)
  async sendWhatsAppMessage(memberId: string, message: string): Promise<void> {
    await delay(200);
    const member = mockMembers.find(m => m.id === memberId);
    if (!member) {
      throw new Error('Member not found');
    }
    console.log(`WhatsApp message sent to ${member.name} (${member.phone}): ${message}`);
  },

  async sendBulkReminders(memberIds: string[], template: string): Promise<void> {
    await delay(1000);
    const promises = memberIds.map(async (memberId) => {
      const member = mockMembers.find(m => m.id === memberId);
      if (member) {
        const personalizedMessage = template
          .replace('{name}', member.name)
          .replace('{amount}', member.contribution.toLocaleString())
          .replace('{date}', new Date().toLocaleDateString());
        
        console.log(`WhatsApp message sent to ${member.name}: ${personalizedMessage}`);
      }
    });
    
    await Promise.all(promises);
    toast.success('Bulk reminders sent successfully!');
  },

  // Export Functions
  async exportToPDF(data: any[], title: string): Promise<void> {
    try {
      const { jsPDF } = await import('jspdf');
      const { default: autoTable } = await import('jspdf-autotable');
      
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.text(title, 20, 20);
      
      // Add date
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
      
      // Add table
      if (data.length > 0) {
        const columns = Object.keys(data[0]).map(key => ({ header: key, dataKey: key }));
        
        autoTable(doc, {
          columns,
          body: data,
          startY: 40,
          styles: { fontSize: 8 },
          headStyles: { fillColor: [59, 130, 246] }
        });
      }
      
      doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}.pdf`);
      toast.success('PDF exported successfully!');
    } catch (error) {
      toast.error('Failed to export PDF');
      throw error;
    }
  },

  async exportToExcel(data: any[], filename: string): Promise<void> {
    try {
      const XLSX = await import('xlsx');
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Data');
      XLSX.writeFile(wb, `${filename}.xlsx`);
      toast.success('Excel file exported successfully!');
    } catch (error) {
      toast.error('Failed to export Excel file');
      throw error;
    }
  }
};

export default apiService;