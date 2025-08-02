import { useState, useMemo, memo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ChevronLeft, ChevronRight, Trophy, TrendingUp, TrendingDown } from 'lucide-react';
import { Badge } from '../ui/badge';

const VersusCommonContest = ({ userContest1, userContest2 }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = useCallback((newPage) => {
        setPage(newPage);
    }, []);

    const handleChangeRowsPerPage = useCallback((value) => {
        setRowsPerPage(parseInt(value));
        setPage(0);
    }, []);

    // Memoize expensive calculations for better performance
    const { rows, username1, username2, stats } = useMemo(() => {
        if (!userContest1 || !userContest2 || userContest1.length === 0 || userContest2.length === 0) {
            return { rows: [], username1: '', username2: '', stats: { total: 0, user1Wins: 0, user2Wins: 0 } };
        }

        const contest1 = new Map(userContest1.map(contest => [contest.contestId, contest]));
        const username1 = userContest1[0].handle;
        const username2 = userContest2[0].handle;

        const rows = userContest2
            .filter(contest2 => contest1.has(contest2.contestId))
            .map(contest2 => {
                const contest1Data = contest1.get(contest2.contestId);
                return {
                    name: contest2.contestName,
                    user1: contest1Data.rank,
                    user2: contest2.rank,
                    diff: contest1Data.rank - contest2.rank,
                };
            })
            .reverse();

        const stats = {
            total: rows.length,
            user1Wins: rows.filter(row => row.diff > 0).length,
            user2Wins: rows.filter(row => row.diff < 0).length,
        };

        return { rows, username1, username2, stats };
    }, [userContest1, userContest2]);

    // Check if userContest1 and userContest2 are available and not empty
    if (!userContest1 || !userContest2 || userContest1.length === 0 || userContest2.length === 0) {
        return (
            <Card>
                <CardContent className="py-8">
                    <div className="text-center text-muted-foreground">
                        No common contest data available
                    </div>
                </CardContent>
            </Card>
        );
    }

    const totalPages = Math.ceil(rows.length / rowsPerPage);
    const startIndex = page * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, rows.length);
    
    // Memoize current rows to avoid recalculating on every render
    const currentRows = useMemo(() => {
        return rows.slice(startIndex, endIndex);
    }, [rows, startIndex, endIndex]);

    const getDifferenceColor = useCallback((diff) => {
        if (diff > 0) return 'text-green-600';
        if (diff < 0) return 'text-red-600';
        return 'text-muted-foreground';
    }, []);

    const getDifferenceIcon = useCallback((diff) => {
        if (diff > 0) return <TrendingUp className="h-4 w-4 text-green-600" />;
        if (diff < 0) return <TrendingDown className="h-4 w-4 text-red-600" />;
        return null;
    }, []);

    return (
        <div className="space-y-4">
            {/* Header Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <Card>
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-foreground">{stats.total}</div>
                        <div className="text-sm text-muted-foreground">Common Contests</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">
                            {stats.user1Wins}
                        </div>
                        <div className="text-sm text-muted-foreground">{username1} Won</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">
                            {stats.user2Wins}
                        </div>
                        <div className="text-sm text-muted-foreground">{username2} Won</div>
                    </CardContent>
                </Card>
            </div>

            {/* Table */}
            <Card>
                <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Trophy className="h-5 w-5 text-primary" />
                                Contest Comparison
                            </CardTitle>
                            <CardDescription>
                                Head-to-head comparison in {rows.length} common contests
                            </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Rows per page:</span>
                            <Select value={rowsPerPage.toString()} onValueChange={handleChangeRowsPerPage}>
                                <SelectTrigger className="w-20">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="25">25</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                    <SelectItem value="100">100</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead className="font-semibold">Contest Name</TableHead>
                                    <TableHead className="text-right font-semibold">{username1}</TableHead>
                                    <TableHead className="text-right font-semibold">{username2}</TableHead>
                                    <TableHead className="text-right font-semibold">Difference</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentRows.map((row, index) => (
                                    <TableRow key={row.name} className="hover:bg-muted/30">
                                        <TableCell className="font-medium max-w-md">
                                            <div className="truncate" title={row.name}>
                                                {row.name}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant="outline" className="font-mono">
                                                #{row.user1}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Badge variant="outline" className="font-mono">
                                                #{row.user2}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                {getDifferenceIcon(row.diff)}
                                                <span className={`font-bold ${getDifferenceColor(row.diff)}`}>
                                                    {Math.abs(row.diff)}
                                                </span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between pt-4">
                            <div className="text-sm text-muted-foreground">
                                Showing {startIndex + 1} to {endIndex} of {rows.length} contests
                            </div>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleChangePage(page - 1)}
                                    disabled={page === 0}
                                >
                                    <ChevronLeft className="h-4 w-4 mr-1" />
                                    Previous
                                </Button>
                                <span className="text-sm text-muted-foreground">
                                    Page {page + 1} of {totalPages}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleChangePage(page + 1)}
                                    disabled={page >= totalPages - 1}
                                >
                                    Next
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default memo(VersusCommonContest);
