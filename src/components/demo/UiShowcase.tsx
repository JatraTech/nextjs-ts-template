"use client";

import AccordionCollapseComponent1 from "@/components/antd/AccordionCollapse/AccordionCollapseComponent1";
import CustomPopover from "@/components/antd/CustomPopover/CustomPopover";
import ActionDropdownComponent from "@/components/antd/Dropdown/ActionDropdownComponent";
import CustomTable from "@/components/antd/CustomTable/CustomTable";
import GlobalDrawer from "@/components/antd/Drawers/GlobalDrawer";
import DatePickerComponent1 from "@/components/antd/Inputs/DatePickerComponent1";
import InputComponent1 from "@/components/antd/Inputs/InputComponent1";
import PasswordInput from "@/components/antd/Inputs/PasswordInput";
import SkeletonLoader1 from "@/components/antd/Loader/SkeletonLoader1";
import ConfirmationModal from "@/components/antd/Modals/ConfirmationModal";
import GlobalModal from "@/components/antd/Modals/GlobalModal";
import SearchInputField from "@/components/antd/SearchInputField/SearchInputField";
import SearchInputField2 from "@/components/antd/SearchInputField/SearchInputField2";
import CustomSegmented from "@/components/antd/Segmented/CustomSegmented";
import SelectComponent1 from "@/components/antd/Selects/SelectComponent1";
import SelectComponentWithInfiniteScroll from "@/components/antd/Selects/SelectComponentWithInfiniteScroll";
import { useInfiniteSelectOptions } from "@/hooks/useInfiniteSelectOptions";
import type { InfiniteSelectFetchPageResult } from "@/hooks/useInfiniteSelectOptions";
import CustomSwitch from "@/components/antd/Switch/CustomSwitch";
import ButtonFilled from "@/components/shared/Buttons/ButtonFilled";
import ButtonOutlined from "@/components/shared/Buttons/ButtonOutlined";
import BackIcon from "@/components/shared/Common/BackIcon";
import Paragraph from "@/components/shared/Common/Paragraph";
import TitleHeader from "@/components/shared/Common/TitleHeader";
import SmallLoader from "@/components/shared/Loaders/SmallLoader";
import Link from "next/link";
import { type ReactNode, useCallback, useId, useState } from "react";
import { useForm, type FieldValues } from "react-hook-form";

import { FIELD_LABEL_CLASS, INPUT_SHELL } from "@/constants/inputShell";
import type { Dayjs } from "dayjs";

const roleOptions = [
  { id: "user", display_name: "User" },
  { id: "admin", display_name: "Admin" },
];

const MOCK_REMOTE_USERS = Array.from({ length: 48 }, (_, index) => ({
  id: index + 1,
  display_name: `Member ${index + 1}`,
  email: `member${index + 1}@example.com`,
}));

const INFINITE_PAGE_SIZE = 12;

function useDemoInfiniteAssigneeSelect() {
  const fetchPage = useCallback(
    async ({
      page,
      search,
    }: {
      page: number;
      search: string;
    }): Promise<InfiniteSelectFetchPageResult<number>> => {
      const term = search.trim().toLowerCase();
      const filtered = MOCK_REMOTE_USERS.filter(
        (row) =>
          !term ||
          row.display_name.toLowerCase().includes(term) ||
          row.email.toLowerCase().includes(term),
      );
      const start = (page - 1) * INFINITE_PAGE_SIZE;
      const slice = filtered.slice(start, start + INFINITE_PAGE_SIZE);
      return {
        options: slice.map((row) => ({
          value: row.id,
          label: row.display_name,
          description: row.email,
          avatarFallback: row.display_name.charAt(0),
        })),
        hasMore: start + INFINITE_PAGE_SIZE < filtered.length,
      };
    },
    [],
  );

  return useInfiniteSelectOptions<number>({ fetchPage });
}

interface DemoFormValues {
  name: string;
  email: string;
  password: string;
  role?: string;
  eventDate?: Dayjs | null;
}

const tableColumns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Role", dataIndex: "role", key: "role" },
];

const tableData = [
  { id: 1, name: "Alex Morgan", email: "alex@example.com", role: "Admin" },
  { id: 2, name: "Sam Lee", email: "sam@example.com", role: "User" },
  { id: 3, name: "Jordan Kim", email: "jordan@example.com", role: "User" },
];

function DemoSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  const headingId = useId();

  return (
    <section
      className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm space-y-4 transition-colors"
      aria-labelledby={headingId}
    >
      <div>
        <h2 id={headingId} className="text-xl font-semibold text-grey-950 dark:text-slate-100 font-inter">
          {title}
        </h2>
        {description ? (
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-inter">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export default function UiShowcase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [segment, setSegment] = useState<string | number>("list");
  const [assigneeId, setAssigneeId] = useState<number | null>(null);
  const infiniteAssignee = useDemoInfiniteAssigneeSelect();

  const { control, handleSubmit, watch } = useForm<DemoFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: undefined,
      eventDate: null,
    },
  });

  const onDemoSubmit = (data: DemoFormValues) => {
    console.log("Demo form:", data);
  };

  const formPreview = watch();

  return (
    <div className="container-x px-4 py-12 space-y-10">
      <header className="max-w-3xl mx-auto text-center space-y-4">
        <div className="flex justify-center">
          <TitleHeader title="Component showcase" className="!text-4xl" />
        </div>
        <Paragraph
          className="!text-slate-500 !text-center block"
          content="Shared UI and Ant Design wrappers used in this boilerplate. Use this page as a living style reference."
        />
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link href="/login">
            <ButtonFilled text="Login" className="!text-base !py-2.5 !px-5" />
          </Link>
          <Link href="/register">
            <ButtonOutlined text="Register" className="!text-base !py-2.5 !px-5" />
          </Link>
          <Link href="/dashboard">
            <ButtonOutlined text="Dashboard" className="!text-base !py-2.5 !px-5" />
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto grid gap-8">
        <DemoSection
          title="Shared buttons & loaders"
          description="ButtonFilled, ButtonOutlined, BackIcon, SmallLoader"
        >
          <div className="flex flex-wrap items-center gap-4">
            <ButtonFilled text="Primary action" />
            <ButtonOutlined text="Secondary" />
            <ButtonFilled text="Loading" loading />
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <BackIcon />
              <span>BackIcon</span>
            </div>
            <SmallLoader />
          </div>
        </DemoSection>

        <DemoSection
          title="Form fields (React Hook Form)"
          description="InputComponent1, PasswordInput, SelectComponent1, DatePickerComponent1 (React Hook Form)"
        >
          <form onSubmit={handleSubmit(onDemoSubmit)} className="grid gap-5 md:grid-cols-2">
            <InputComponent1
              name="name"
              label="Full name"
              labelClassName={FIELD_LABEL_CLASS}
              placeholder="Full name"
              control={control}
              validation
              rules={{ required: "Name is required" }}
              inputContainerClassName={INPUT_SHELL}
            />
            <InputComponent1
              name="email"
              label="Email"
              labelClassName={FIELD_LABEL_CLASS}
              type="email"
              placeholder="Email"
              control={control}
              validation
              rules={{ required: "Email is required" }}
              inputContainerClassName={INPUT_SHELL}
            />
            <PasswordInput
              name="password"
              label="Password"
              labelClassName={FIELD_LABEL_CLASS}
              placeholder="Password"
              control={control}
              validation
              rules={{ required: "Password is required" }}
              containerClassName="flex-col gap-2 !items-start"
              inputContainerClassName={INPUT_SHELL}
            />
            <SelectComponent1
              name="role"
              label="Role"
              labelClassName={FIELD_LABEL_CLASS}
              control={control}
              options={roleOptions}
              labelTag="display_name"
              valueTag="id"
              placeholder="Select role"
              validation
              rules={{ required: "Pick a role" }}
              bordered={false}
              selectClassName={`custom-select-container w-full ${INPUT_SHELL}`}
            />
            <DatePickerComponent1
              name="eventDate"
              label="Event date"
              labelClassName={FIELD_LABEL_CLASS}
              placeholder="Select date and time"
              control={control}
              bordered={false}
              inputContainerClassName={INPUT_SHELL}
            />
            <div className="md:col-span-2 flex justify-end">
              <ButtonFilled type="submit" text="Submit demo form" className="!text-base" />
            </div>
          </form>
          <pre className="text-xs bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg p-3 overflow-auto font-mono text-slate-700 dark:text-slate-300">
            {JSON.stringify(formPreview, null, 2)}
          </pre>
        </DemoSection>

        <DemoSection
          title="Infinite search select"
          description="SelectComponentWithInfiniteScroll + useInfiniteSelectOptions (remote search, scroll to load more)"
        >
          <div className="max-w-md">
            <SelectComponentWithInfiniteScroll<FieldValues, number>
              name="assignee"
              label="Assignee"
              labelClassName={FIELD_LABEL_CLASS}
              placeholder="Search members…"
              value={assigneeId}
              onChange={setAssigneeId}
              options={infiniteAssignee.options}
              loading={infiniteAssignee.loading}
              loadingMore={infiniteAssignee.loadingMore}
              hasMore={infiniteAssignee.hasMore}
              onSearch={infiniteAssignee.onSearch}
              onScrollEnd={infiniteAssignee.onScrollEnd}
              collapseLabelOnSelect
              showAvatar
              selectClassName={`custom-select-container w-full ${INPUT_SHELL}`}
              bordered={false}
            />
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              Selected id: {assigneeId ?? "—"}
            </p>
          </div>
        </DemoSection>

        <DemoSection title="Search inputs" description="SearchInputField variants">
          <div className="grid gap-6 max-w-2xl">
            <SearchInputField
              placeholder="Search listings…"
              onSearch={() => console.log("Search 1 clicked")}
            />
            <SearchInputField2
              placeholder="Filter by keyword…"
              value=""
              onChange={() => {}}
              onKeyDown={() => {}}
              onSearch={() => console.log("Search 2 clicked")}
            />
          </div>
        </DemoSection>

        <DemoSection
          title="Overlays"
          description="GlobalModal, GlobalDrawer, ConfirmationModal, CustomPopover, ActionDropdown"
        >
          <div className="flex flex-wrap gap-3">
            <ButtonFilled text="Open modal" onClick={() => setModalOpen(true)} />
            <ButtonOutlined text="Open drawer" onClick={() => setDrawerOpen(true)} />
            <ButtonOutlined text="Confirm dialog" onClick={() => setConfirmOpen(true)} />
          </div>
          <div className="flex flex-wrap items-center gap-6 pt-2">
            <CustomPopover
              popoverTitle="Details"
              popoverContent="Popover content uses the app font via Ant Design overlays."
            >
              <ButtonOutlined text="Open popover" />
            </CustomPopover>
            <ActionDropdownComponent
              title="Actions menu"
              menuItems={[
                { key: "edit", label: "Edit" },
                { key: "duplicate", label: "Duplicate" },
                { key: "delete", label: "Delete", danger: true },
              ]}
              handleClick={({ key }: { key: string }) => console.log("Dropdown:", key)}
            />
          </div>

          <GlobalModal
            isModalOpen={modalOpen}
            setModalHandler={() => setModalOpen(false)}
            controller={false}
            title="Example modal"
            onClose={() => setModalOpen(false)}
            modalContainerClassName=""
            titleClassName=""
            titleContentClassName=""
          >
            <p className="onpoint-overlay-body m-0 px-6 py-6 text-slate-600 dark:text-slate-300 font-inter">
              Modal body content. Close with the header icon or mask.
            </p>
          </GlobalModal>

          <GlobalDrawer
            isDrawerOpen={drawerOpen}
            setDrawerHandler={() => setDrawerOpen(false)}
            controller={false}
            title="Example drawer"
            titleClassName=""
            titleContentClassName=""
            onReload={() => {}}
          >
            <p className="onpoint-overlay-body m-0 text-slate-600 dark:text-slate-300 font-inter">
              Drawer content slides in from the side.
            </p>
          </GlobalDrawer>

          <ConfirmationModal
            isModalOpen={confirmOpen}
            setModalHandler={() => setConfirmOpen(false)}
            controller={false}
            title="Delete this item?"
            onClose={() => setConfirmOpen(false)}
            modalContainerClassName=""
            titleClassName=""
            buttonContainerClassName=""
            onConfirm={() => {
              setConfirmOpen(false);
              console.log("Confirmed");
            }}
            onCancel={() => setConfirmOpen(false)}
          />
        </DemoSection>

        <DemoSection title="Switch & segmented">
          <div className="flex flex-wrap items-center gap-8">
            <CustomSwitch
              defaultChecked
              onChange={(checked: boolean) => console.log("Switch:", checked)}
            />
            <CustomSegmented
              defaultValue="list"
              options={[
                { label: "List", value: "list" },
                { label: "Grid", value: "grid" },
                { label: "Map", value: "map" },
              ]}
              onChange={(value: string | number) => setSegment(value)}
            />
            <span className="text-sm text-slate-500 font-inter">View: {segment}</span>
          </div>
        </DemoSection>

        <DemoSection title="Accordion">
          <AccordionCollapseComponent1
            header="What is included in this boilerplate?"
            content="Next.js App Router, TypeScript, Redux Toolkit auth, React Hook Form fields, Ant Design wrappers, and shared OnPoint-style components."
            contentKey="faq-1"
          />
        </DemoSection>

        <DemoSection title="Table" description="CustomTable with sample rows">
          <CustomTable
            columns={tableColumns}
            data={tableData}
            checkboxShow
            customStyles=""
          />
        </DemoSection>

        <DemoSection title="Skeleton loader">
          <SkeletonLoader1
            containerClassName="w-full max-w-md h-48 p-0"
            skeletonClassName="!h-48 !w-full"
          />
        </DemoSection>
      </div>
    </div>
  );
}
