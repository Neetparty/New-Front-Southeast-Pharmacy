"use client"
import React, { useState, createContext, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Category, FormState, TableState } from "./create-category";
import { CreateCategory, DeleteCategory, GetCategory } from "./category-api";
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
const CreateCategoryContext = createContext<CreateCategoryContextType | null>(null);

export interface CreateCategoryContextType {
  tableState: TableState;
  setTableState: React.Dispatch<React.SetStateAction<TableState>>;
  formState: FormState;
  setFormState: React.Dispatch<React.SetStateAction<FormState>>;
  router: AppRouterInstance;
  LoadData: () => Promise<void>;
  HandleDelete: () => Promise<void>;
  HandleUpdate: () => Promise<void>;
  onSubmit: (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => Promise<void>;
}


export function useCreateCategory(): CreateCategoryContextType | null {
  const context = useContext(CreateCategoryContext);
  return context;
}

export const CreateCategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [tableState, setTableState] = useState<TableState>({
    category: [
      {
        category_id: "adsad",
        category_name: "dasda",
        category_name_en: "das",
        category_name_ch: "das",
        updated_at: "sdads",
        created_at: "dasds",
      }
    ],
    loading: false,
    select: "",
    index: -1,
    search: ""
  })

  const [formState, setFormState] = useState<FormState>({
    category_th: "",
    category_en: "",
    category_cn: "",
  })



  useEffect(() => {

    LoadData()

  }, [])

  useEffect(() => {
    if (tableState.index !== -1 && tableState.select === "delete") {
      HandleDelete()
    }
    else if (tableState.index !== -1 && tableState.select === "update") {
      HandleUpdate()
    }
  }, [tableState.select])



  return (

    <CreateCategoryContext.Provider
      value={{
        router,
        setTableState,
        tableState,
        HandleDelete,
        HandleUpdate,
        LoadData,
        onSubmit,
        formState,
        setFormState,
      }}>
      {children}
    </CreateCategoryContext.Provider>
  );


  async function onSubmit(e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) {
    e.preventDefault();
    setFormState(prev => ({ ...prev, loading: true }));
    const { category_th, category_en, category_cn } = formState;

    let err = Validation()
    if (err) {
      return
    }

    const { data, error } = await CreateCategory(
      category_th, category_en, category_cn
    )

    // console.log(data)
    if (error || !data?.category) {
      toast.error(error);
      setFormState(prev => ({ ...prev, loading: false }));
      return;
    }
    else {
      toast.success("หมวดหมู่สินค้านี้ได้ถูกสร้างแล้วเรียบร้อย")
      setFormState(prev => ({ ...prev, loading: false, submit: true }));
      setTableState(prev => ({ ...prev, category: [...prev.category, data.category] }))
    }
  }

  function Validation(): boolean {
    const { category_th, category_en, category_cn } = formState;

    const stringParams = [
      { value: category_th, field: 'ชื่อหมวดหมู่ (ภาษาไทย)' },
      { value: category_en, field: 'ชื่อหมวดหมู่ (ภาษาอังกฤษ)' },
      { value: category_cn, field: 'ชื่อหมวดหมู่ (ภาษาจีน)' }
    ];

    for (const param of stringParams) {
      if (typeof param.value !== 'string' || param.value.trim() === '') {
        toast.error(`ดูเหมือนคุณยังไม่ได้กรอก ${param.field}`);
        setFormState(prev => ({ ...prev, loading: false }));
        return true;
      }
    }

    return false;
  }

  async function LoadData() {
    setTableState(prev => ({ ...prev, loading: true }));
    const { data, error } = await GetCategory();
    if (error || !data || data.category.length === 0) {
      toast.error(error || "error");
      setTableState(prev => ({ ...prev, loading: false }));
      return;
    }
    else {
      setTableState(prev => ({ ...prev, category: data.category, loading: false }))
    }
  }

  async function HandleDelete() {
    setTableState(prev => ({ ...prev, loading: true }));
    let cateId: string = "";
    let tempName: string = "";
    let tempCate: Category[] = [];
    const { category, index } = tableState;

    category.forEach((elem, i) => {
      if (index === i) {
        cateId = elem.category_id;
        tempName = elem.category_name
        return;
      }
    });

    if (window.confirm(`คุณต้องการลบหมวดหมู่ ${tempName} ใช่ไหม`)) {
      const { data, error } = await DeleteCategory(cateId)
      if (error) {
        toast.error(error);
        setTableState(prev => ({ ...prev, loading: false }));
        return;
      }

      toast.success("ลบหมวดหมู่เรียบร้อยแล้ว");
      for (let i = 0; i < category.length; i++) {
        if (category[i].category_id === cateId && category[i] !== undefined) {
          continue;
        }
        else {
          tempCate.push(category[i]);
        }
      }
      setTableState((prev) => ({ ...prev, category: tempCate, loading: false, select: "setting", index: -1 }))
    }
    else {
      setTableState((prev) => ({ ...prev, loading: false, select: "setting", index: -1 }))
    }
  }

  async function HandleUpdate() {
    let tempId: string = "";
    const { category, index } = tableState;

    category.forEach((elem, i) => {
      if (index === i) {
        tempId = elem.category_id;
        return;
      }
    });

    router.push(`/admin/update-category/${tempId}`, { scroll: false })

  }


};
