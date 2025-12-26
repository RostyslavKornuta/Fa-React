import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  type SelectChangeEvent,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LaunchIcon from "@mui/icons-material/Launch";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";

import { CustomTable, type CustomTableColumn } from "../../shared/lib/table";
import { CustomTableStatusCell } from "../../shared/lib/table/cells/status-cell";
import { CustomTableTextCell } from "../../shared/lib/table/cells/text-cell";
import { CustomTableDateCell } from "../../shared/lib/table/cells/date-cell";
import { Loader } from "../../shared/ui/loader";
import { Search } from "../../shared/lib/search";

import type { ContentArticle } from "../../shared/models/content";
import type { Author } from "../../shared/models/author";
import type { Category } from "../../shared/models/category";

import { useAppSelector } from "../../hooks/hooks";
import { useDebounce } from "../../hooks/useDebounce";

import { useGetContentQuery } from "../../shared/api/content/contentApi";
import { useGetAuthorsQuery } from "../../shared/api/authors/authorsApi";
import { useGetCategoriesQuery } from "../../shared/api/categories/categoriesApi";
import { useGetDomainByIdQuery } from "../../shared/api/domains/domainsApi";
import { defaultContentSize } from "../../shared/api/constants";

export const Content = () => {
  const navigate = useNavigate();
  const { domainId } = useParams<{ domainId: string }>();

  const shouldSkip = !domainId;

  const searchRequest = useAppSelector(
    (state) => state.searchRequest.searchRequest
  );

  const [searchQuery, setSearchQuery] = useState(
    searchRequest.searchQuery || ""
  );
  const debouncedSearchQuery = useDebounce(searchQuery);

  const [content, setContent] = useState<ContentArticle[]>([]);

  const { data: selectedDomain } = useGetDomainByIdQuery(domainId ?? skipToken);

  const { data: authors } = useGetAuthorsQuery(
    shouldSkip ? skipToken : { ...searchRequest, domainId }
  );

  const { data: categories } = useGetCategoriesQuery(
    shouldSkip ? skipToken : { ...searchRequest, domainId }
  );

  const { data: articles, isFetching: isContentFetching } = useGetContentQuery(
    shouldSkip
      ? skipToken
      : {
          ...searchRequest,
          domainId,
          searchQuery: debouncedSearchQuery,
          order: "modifiedAt",
          sort: ["modifiedAt", "desc"],
          size: defaultContentSize,
        },
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    setContent(articles ?? []);
  }, [articles]);

  const getAuthorById = (authorId: string) =>
    authors?.find((a: Author) => a.id === authorId)?.name;

  const transformAuthorName = (name: string) =>
    name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  const onSettingsClick = () => navigate("edit");

  const onOpenArticleClick = (path: string) => {
    if (!selectedDomain) return;

    window.open(
      `https://${selectedDomain.name}${
        selectedDomain.subPath ? "/fp" : ""
      }${path}`,
      "_blank"
    );
  };

  const onCategoryChange = (
    event: SelectChangeEvent,
    articleToChange: ContentArticle
  ) => {
    setContent((prev) =>
      prev.map((article) =>
        article.id === articleToChange.id
          ? { ...article, category: event.target.value }
          : article
      )
    );
  };

  const columns = useMemo<CustomTableColumn<ContentArticle>[]>(
    () => [
      {
        title: "Title",
        key: "title",
        styles: {
          width: "350px",
          maxWidth: "350px",
          flex: "unset",
        },
        render: (row) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                border: "1px solid #CBCEDA",
                borderRadius: "8px",
                backgroundColor: "#E7E8EC",
              }}
            >
              {row.favoriteImage && (
                <img
                  src={`/api/images/${row.favoriteImage}`}
                  width="100%"
                  height="100%"
                  style={{
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                />
              )}
            </Box>
            <Typography
              sx={{
                fontSize: "12px",
                fontWeight: 500,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {row.title}
            </Typography>
          </Box>
        ),
      },
      {
        title: "Status",
        key: "status",
        render: (row) => <CustomTableStatusCell status={row.status} />,
      },
      {
        title: "Trending",
        key: "trending",
        render: (row) => (
          <CustomTableTextCell
            value={row.trending}
            refactor={(v: boolean) => (v ? "Yes" : "No")}
          />
        ),
      },
      {
        title: "Type",
        key: "type",
        render: (row) => (
          <CustomTableTextCell
            value={row.type}
            refactor={(v: string) =>
              v.charAt(0).toUpperCase() + v.slice(1).toLowerCase()
            }
          />
        ),
      },
      {
        title: "Author",
        key: "author",
        render: (row) => (
          <CustomTableTextCell
            value={getAuthorById(row.author) ?? "—"}
            refactor={transformAuthorName}
          />
        ),
      },
      {
        title: "Date",
        key: "date",
        render: (row) => (
          <CustomTableDateCell
            value={row.modifiedAt}
            formatType="MM/dd/yyyy HH:mm"
          />
        ),
      },
      {
        title: "Category",
        key: "category",
        render: (row) => (
          <FormControl fullWidth>
            <InputLabel>Select</InputLabel>
            <Select
              label="Select"
              IconComponent={KeyboardArrowDownIcon}
              value={
                categories?.some((c) => c.id === row.category)
                  ? row.category
                  : ""
              }
              onChange={(e) => onCategoryChange(e, row)}
            >
              <MenuItem value="">None</MenuItem>
              {categories?.map((category: Category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ),
      },
      {
        title: "Actions",
        key: "actions",
        styles: {
          display: "flex",
          justifyContent: "end",
        },
        render: (row) => (
          <Box sx={{ display: "flex", gap: "8px" }}>
            <IconButton onClick={() => onOpenArticleClick(row.path)}>
              <LaunchIcon />
            </IconButton>
            <IconButton onClick={() => navigate(`article/${row.id}`)}>
              <KeyboardArrowRightIcon />
            </IconButton>
          </Box>
        ),
      },
    ],
    [authors, categories, selectedDomain, navigate]
  );

  return (
    <Box
      sx={{
        padding: "16px 24px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          paddingBottom: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography sx={{ fontSize: 24, fontWeight: 700 }}>Content</Typography>
        <Button
          startIcon={<SettingsIcon />}
          color="secondary"
          onClick={onSettingsClick}
        >
          Settings
        </Button>
      </Box>

      <Box
        sx={{
          paddingBottom: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", gap: "8px" }}>
          <Search
            styles={{ width: "400px" }}
            value={searchQuery}
            onChange={setSearchQuery}
          />
          <Button startIcon={<FilterListIcon />}>Filters</Button>
        </Box>
        <Button startIcon={<AddIcon />} color="secondary">
          Add Content
        </Button>
      </Box>

      <Box sx={{ flex: 1, overflowY: "auto" }}>
        {isContentFetching ? (
          <Loader />
        ) : (
          <CustomTable data={content} columns={columns} />
        )}
      </Box>
    </Box>
  );
};
