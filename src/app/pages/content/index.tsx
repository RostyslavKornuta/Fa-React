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
import { useContent } from "../../../hooks/useContent";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { CustomTable, type CustomTableColumn } from "../../../shared/lib/table";
import { CustomTableStatusCell } from "../../../shared/lib/table/cells/status-cell";
import type { ContentArticle } from "../../../shared/models/content";
import { Loader } from "../../../shared/ui/loader";
import { CustomTableTextCell } from "../../../shared/lib/table/cells/text-cell";
import type { Author } from "../../../shared/models/author";
import { CustomTableDateCell } from "../../../shared/lib/table/cells/date-cell";
import type { Category } from "../../../shared/models/category";
import LaunchIcon from "@mui/icons-material/Launch";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import { useAppSelector } from "../../../hooks/hooks";
import { useDispatch } from "react-redux";
import { setContent } from "../../../shared/api/content/contentSlice";
import { Search } from "../../../shared/lib/search";
import { useMemo, useState } from "react";
import { useDebounce } from "../../../hooks/useDebounce";

export const Content = () => {
  const selectedDomain = useAppSelector(
    (state) => state.domains.selectedDomain
  );
  const searchRequest = useAppSelector(
    (state) => state.searchRequest.searchRequest
  );

  const [searchQuery, setSearchQuery] = useState(
    searchRequest.searchQuery || ""
  );
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const { articles, authors, categories, isFetching } = useContent({
    ...searchRequest,
    searchQuery: debouncedSearchQuery,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSettingsClick = () => navigate(`edit`);

  const getAuthorById = (authorId: string) =>
    authors?.find((author: Author) => author.id === authorId)?.name;

  const transformAuthorName = (authorName: string) => {
    const splitted = authorName.split(" ");
    const transformed = splitted.map(
      (word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1, word.length).toLowerCase()
    );

    return transformed.join(" ");
  };

  const onOpenArticleClick = (path: string) => {
    window.open(
      `https://${selectedDomain?.name}${
        selectedDomain?.subPath ? "/fp" : ""
      }${path}`,
      "_blank"
    );
  };

  const onCategoryChange = (
    event: SelectChangeEvent,
    articleToChange: ContentArticle
  ) => {
    const updatedArticles = articles.map((article: ContentArticle) =>
      article.id === articleToChange.id
        ? { ...article, category: event.target.value }
        : article
    );

    dispatch(setContent(updatedArticles));
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
          WebkitFlex: "unset",
        },
        render: (row: ContentArticle) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <Box
              sx={{
                minWidth: "40px",
                maxWidth: "40px",
                minHeight: "40px",
                maxHeight: "40px",
                width: "40px",
                height: "40px",
                border: "1px solid #CBCEDA",
                borderRadius: "8px",
                backgroundColor: "#E7E8EC",
              }}
            >
              {row.favoriteImage && (
                <img
                  width="100%"
                  height="100%"
                  style={{
                    objectFit: "cover",
                    borderRadius: "6px",
                  }}
                  src={`/api/images/${row.favoriteImage}`}
                />
              )}
            </Box>
            <Typography
              sx={{
                maxWidth: "100%",
                fontSize: "12px",
                fontWeight: 500,
                lineHeight: "16px",
                color: "#171F33",
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
        render: (row: ContentArticle) => (
          <CustomTableStatusCell status={row["status"]} />
        ),
      },
      {
        title: "Trending",
        key: "trending",
        render: (row: ContentArticle) => (
          <CustomTableTextCell
            value={row.trending}
            refactor={(value: boolean) => (value ? "Yes" : "No")}
          />
        ),
      },
      {
        title: "Type",
        key: "type",
        render: (row: ContentArticle) => (
          <CustomTableTextCell
            value={row.type}
            refactor={(value: string) =>
              value.charAt(0).toUpperCase() +
              value.slice(1, value.length).toLowerCase()
            }
          />
        ),
      },
      {
        title: "Author",
        key: "author",
        render: (row: ContentArticle) => (
          <CustomTableTextCell
            value={getAuthorById(row.author) || "Null"}
            refactor={transformAuthorName}
          />
        ),
      },
      {
        title: "Date",
        key: "date",
        render: (row: ContentArticle) => (
          <CustomTableDateCell
            value={row.modifiedAt}
            formatType="MM/dd/yyyy HH:mm"
          />
        ),
      },
      {
        title: "Category",
        key: "category",
        render: (row: ContentArticle) => (
          <FormControl fullWidth>
            <InputLabel id="category-table-select">Select</InputLabel>
            <Select
              label="Category"
              labelId="category-table-select"
              value={
                categories?.some((c) => c.id === row.category)
                  ? row.category
                  : ""
              }
              onChange={(event: SelectChangeEvent) =>
                onCategoryChange(event, row)
              }
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
        key: "",
        styles: {
          display: "flex",
          justifyContent: "end",
        },
        render: (row: ContentArticle) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
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
    [articles, authors, categories, selectedDomain]
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
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{ fontSize: "24px", fontWeight: 700, lineHeight: "32px" }}
        >
          Content
        </Typography>
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
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Search value={searchQuery} onChange={setSearchQuery} />
          <Button startIcon={<FilterListIcon />}>Filters</Button>
        </Box>
        <Button
          startIcon={<AddIcon />}
          color="secondary"
          onClick={onSettingsClick}
        >
          Add Content
        </Button>
      </Box>
      <Box sx={{ flex: "1", overflowY: "auto" }}>
        {isFetching ? (
          <Loader />
        ) : (
          <CustomTable data={articles} columns={columns} />
        )}
      </Box>
    </Box>
  );
};
